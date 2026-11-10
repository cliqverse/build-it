/// <reference types="node" />
/**
 * POST /api/enquiry: the contact page's form. Sends each enquiry to the team as a WhatsApp
 * template message through the WhatsApp Cloud API. Nothing is stored.
 *
 * Runs as a Vercel function in production, and inside Vite during `pnpm dev` and `pnpm preview`
 * (see vite.config.ts). It is configured through server-only environment variables, listed in
 * the README under "WhatsApp enquiry form".
 */

const GRAPH_API = 'https://graph.facebook.com/v25.0'
const DEFAULT_TEMPLATE = 'new_enquiry_alert'
const DEFAULT_LANGUAGE = 'en'

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

/** Template parameters may not contain newlines, tabs or long runs of spaces, so all whitespace collapses to single spaces. */
const clean = (value: unknown, max: number) => (typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, max) : '')

/**
 * The number in international format, digits only, or null. Accepts "+234 803 123 4567",
 * "00234…" and "234…"; refuses numbers that start with a single 0, which are missing their country code.
 */
const toInternational = (value: unknown) => {
  if (typeof value !== 'string') return null
  const compact = value.replace(/[\s().-]/g, '').replace(/^00/, '+')
  return /^\+?([1-9]\d{7,14})$/.exec(compact)?.[1] ?? null
}

const sendAlert = async (to: string, parameters: string[]) => {
  const response = await fetch(`${GRAPH_API}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      template: {
        name: process.env.WHATSAPP_ALERT_TEMPLATE || DEFAULT_TEMPLATE,
        language: { code: process.env.WHATSAPP_TEMPLATE_LANGUAGE || DEFAULT_LANGUAGE },
        components: [{ type: 'body', parameters: parameters.map((text) => ({ type: 'text', text })) }],
      },
    }),
    signal: AbortSignal.timeout(10_000),
  })
  if (response.ok) return
  const { error } = (await response.json().catch(() => ({}))) as { error?: { code?: number; message?: string } }
  throw new Error(`WhatsApp API ${response.status}: ${error?.code ?? '?'} ${error?.message ?? ''}`.trim())
}

export async function POST(request: Request): Promise<Response> {
  // Requiring JSON makes browsers on other sites send a CORS preflight first, which this function never approves.
  if (!request.headers.get('content-type')?.startsWith('application/json')) return json({ error: 'unsupported' }, 415)

  const body: unknown = await request.json().catch(() => null)
  if (!body || typeof body !== 'object') return json({ error: 'invalid', fields: [] }, 400)
  const input = body as Record<string, unknown>

  // People never see the "company" field, but bots fill it in. Tell them it worked and send nothing.
  if (clean(input.company, 100)) return json({ ok: true })

  const name = clean(input.name, 100)
  const phone = toInternational(input.phone)
  const need = clean(input.need, 60) || 'Not specified'
  const message = clean(input.message, 1000)
  if (!name || !phone || !message) {
    const fields = [!name && 'name', !phone && 'phone', !message && 'message'].filter(Boolean)
    return json({ error: 'invalid', fields }, 400)
  }

  const recipients = (process.env.WHATSAPP_ALERT_TO ?? '')
    .split(',')
    .map((number) => number.replace(/\D/g, ''))
    .filter(Boolean)
  if (!process.env.WHATSAPP_TOKEN || !process.env.WHATSAPP_PHONE_NUMBER_ID || !recipients.length) {
    console.error('enquiry: WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_ALERT_TO must all be set')
    return json({ error: 'unavailable' }, 503)
  }

  const results = await Promise.allSettled(recipients.map((to) => sendAlert(to, [name, `+${phone}`, need, message])))
  for (const result of results) if (result.status === 'rejected') console.error('enquiry:', String(result.reason))
  return results.some((result) => result.status === 'fulfilled') ? json({ ok: true }) : json({ error: 'send_failed' }, 502)
}
