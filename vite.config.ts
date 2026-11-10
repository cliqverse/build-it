import type { IncomingMessage, ServerResponse } from 'node:http'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { POST as enquiry } from './api/enquiry.ts'

/** Runs api/enquiry.ts inside `pnpm dev` and `pnpm preview`, the way Vercel runs it in production. */
const localApi = (): Plugin => {
  const handle = async (req: IncomingMessage, res: ServerResponse) => {
    // Joined before decoding, so a character split across two chunks still arrives intact.
    const chunks: Buffer[] = []
    for await (const chunk of req) chunks.push(chunk as Buffer)
    const body = Buffer.concat(chunks).toString()
    const headers = new Headers()
    for (const [key, value] of Object.entries(req.headers)) if (typeof value === 'string') headers.set(key, value)
    const response =
      req.method === 'POST'
        ? await enquiry(new Request(`http://${req.headers.host}/api/enquiry`, { method: 'POST', headers, body }))
        : new Response(null, { status: 405, headers: { Allow: 'POST' } })
    res.statusCode = response.status
    response.headers.forEach((value, key) => res.setHeader(key, value))
    res.end(await response.text())
  }
  const route = (req: IncomingMessage, res: ServerResponse) => {
    handle(req, res).catch((error: unknown) => {
      console.error(error)
      res.statusCode = 500
      res.end()
    })
  }
  return {
    name: 'local-api',
    configureServer: (server) => void server.middlewares.use('/api/enquiry', route),
    configurePreviewServer: (server) => void server.middlewares.use('/api/enquiry', route),
  }
}

export default defineConfig(({ command, mode }) => {
  // The local API's settings. Without the VITE_ prefix, Vite never puts them in the browser bundle.
  if (command === 'serve') Object.assign(process.env, loadEnv(mode, process.cwd(), 'WHATSAPP_'))

  return {
    plugins: [vue(), tailwindcss(), localApi()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
