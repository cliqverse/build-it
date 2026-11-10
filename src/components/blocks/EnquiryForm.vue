<script setup lang="ts">
import { computed, nextTick, ref, useId, useTemplateRef, watch } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AppLink from '@/components/ui/AppLink.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconBadge from '@/components/ui/IconBadge.vue'
import type { EnquiryFormCopy, ProjectType } from '@/types/content'

const props = defineProps<{
  copy: EnquiryFormCopy
  projectTypes: ProjectType[]
  /** The project type picked on the home page, if any. */
  picked?: string
  email: string
}>()

type Field = 'name' | 'phone' | 'message'

const id = useId()
const form = ref({ name: '', phone: '', need: props.picked ?? '', message: '', company: '' })
const invalid = ref<Field[]>([])
const status = ref<'idle' | 'sending' | 'sent' | 'failed'>('idle')
const thanks = useTemplateRef<HTMLElement>('thanks')

watch(
  () => props.picked,
  (picked) => {
    if (picked) form.value.need = picked
  },
)

const needLabel = computed(() => props.projectTypes.find((type) => type.id === form.value.need)?.label ?? props.copy.notSure)

const fieldId = (name: string) => `${id}-${name}`
const isInvalid = (field: Field) => invalid.value.includes(field)
/** A field's error replaces its hint, so it is described by one or the other. */
const describedBy = (field: Field, hasHint = false) => {
  if (isInvalid(field)) return fieldId(`${field}-error`)
  return hasHint ? fieldId(`${field}-hint`) : undefined
}
const clear = (field: Field) => {
  invalid.value = invalid.value.filter((other) => other !== field)
}

const flag = async (fields: Field[]) => {
  invalid.value = fields
  await nextTick()
  const first = fields[0]
  if (first) document.getElementById(fieldId(first))?.focus()
}

const submit = async () => {
  if (status.value === 'sending') return
  const missing = (['name', 'phone', 'message'] as const).filter((field) => !form.value[field].trim())
  if (missing.length) return flag(missing)

  invalid.value = []
  status.value = 'sending'
  try {
    const response = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form.value, need: needLabel.value }),
    })
    if (response.ok) {
      status.value = 'sent'
      await nextTick()
      thanks.value?.focus()
      return
    }
    const result = (await response.json().catch(() => ({}))) as { fields?: Field[] }
    if (response.status === 400 && result.fields?.length) {
      status.value = 'idle'
      return flag(result.fields)
    }
    status.value = 'failed'
  } catch {
    status.value = 'failed'
  }
}

/* Horizontal padding is left to each field so the select can make room for its arrow. */
const field =
  'mt-2 block w-full rounded-xl border border-ink/15 bg-white py-3 text-base text-ink shadow-soft transition-colors duration-300 ease-smooth placeholder:text-ink/55 hover:border-ink/30 focus:border-brand-600 aria-[invalid=true]:border-maroon-700'
const label = 'text-sm font-bold text-ink'
const note = 'mt-2 text-sm text-ink/70'
const error = 'mt-2 text-sm font-medium text-maroon-700'
</script>

<template>
  <div class="rounded-2xl border border-ink/[0.07] bg-white p-7 shadow-soft lg:p-8">
    <div class="flex flex-col gap-5 sm:flex-row">
      <IconBadge icon="whatsapp" tone="maroon" />
      <div class="min-w-0 flex-1">
        <h3 class="font-display text-2xl font-bold tracking-tight text-ink">{{ copy.title }}</h3>
        <p class="mt-1 text-ink/70">{{ copy.body }}</p>

        <div v-if="status === 'sent'" class="mt-6 rounded-xl bg-brand-100 p-5">
          <p ref="thanks" tabindex="-1" class="flex items-center gap-2 font-bold text-ink">
            <AppIcon name="check" :size="20" :stroke-width="2.25" class="shrink-0 text-brand-600" />
            {{ copy.success.title }}
          </p>
          <p class="mt-1 text-ink/70">{{ copy.success.body }}</p>
        </div>

        <form v-else class="mt-6 grid gap-5 sm:grid-cols-2" novalidate @submit.prevent="submit">
          <div>
            <label :for="fieldId('name')" :class="label">{{ copy.fields.name.label }}</label>
            <input
              :id="fieldId('name')"
              v-model="form.name"
              type="text"
              name="name"
              autocomplete="name"
              maxlength="100"
              :class="[field, 'px-4']"
              :aria-invalid="isInvalid('name') || undefined"
              :aria-describedby="describedBy('name')"
              @input="clear('name')"
            />
            <p v-if="isInvalid('name')" :id="fieldId('name-error')" :class="error">{{ copy.fields.name.error }}</p>
          </div>

          <div>
            <label :for="fieldId('phone')" :class="label">{{ copy.fields.phone.label }}</label>
            <input
              :id="fieldId('phone')"
              v-model="form.phone"
              type="tel"
              name="phone"
              autocomplete="tel"
              inputmode="tel"
              maxlength="24"
              :placeholder="copy.fields.phone.placeholder"
              :class="[field, 'px-4']"
              :aria-invalid="isInvalid('phone') || undefined"
              :aria-describedby="describedBy('phone', true)"
              @input="clear('phone')"
            />
            <p v-if="isInvalid('phone')" :id="fieldId('phone-error')" :class="error">{{ copy.fields.phone.error }}</p>
            <p v-else :id="fieldId('phone-hint')" :class="note">{{ copy.fields.phone.hint }}</p>
          </div>

          <div class="sm:col-span-2">
            <label :for="fieldId('need')" :class="label">{{ copy.fields.need.label }}</label>
            <div class="relative">
              <select :id="fieldId('need')" v-model="form.need" name="need" :class="[field, 'appearance-none pr-11 pl-4']">
                <option value="">{{ copy.notSure }}</option>
                <option v-for="type in projectTypes" :key="type.id" :value="type.id">{{ type.label }}</option>
              </select>
              <AppIcon name="chevron-down" :size="20" class="pointer-events-none absolute top-1/2 right-4 mt-1 -translate-y-1/2 text-ink/60" />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label :for="fieldId('message')" :class="label">{{ copy.fields.message.label }}</label>
            <textarea
              :id="fieldId('message')"
              v-model="form.message"
              name="message"
              rows="4"
              maxlength="700"
              :placeholder="copy.fields.message.placeholder"
              :class="[field, 'resize-y px-4']"
              :aria-invalid="isInvalid('message') || undefined"
              :aria-describedby="describedBy('message')"
              @input="clear('message')"
            />
            <p v-if="isInvalid('message')" :id="fieldId('message-error')" :class="error">{{ copy.fields.message.error }}</p>
          </div>

          <!-- Spam trap. Not displayed at all, so browser autofill never fills it in for a real visitor. -->
          <div class="hidden">
            <label :for="fieldId('company')">{{ copy.honeypot }}</label>
            <input :id="fieldId('company')" v-model="form.company" type="text" name="company" tabindex="-1" autocomplete="off" />
          </div>

          <div class="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p class="text-sm text-ink/70">
              {{ copy.consent }}
              <AppLink
                :href="copy.privacyLink.href"
                class="font-semibold text-ink underline decoration-brand-600/40 decoration-2 underline-offset-4 transition-colors duration-300 hover:decoration-brand-600"
              >
                {{ copy.privacyLink.label }}
              </AppLink>
            </p>
            <BaseButton type="submit" size="lg" icon="arrow-right" class="shrink-0">
              {{ status === 'sending' ? copy.sending : copy.submit }}
            </BaseButton>
          </div>

          <p v-if="status === 'failed'" role="alert" class="rounded-xl bg-maroon-50 p-4 text-sm font-medium text-maroon-700 sm:col-span-2">
            {{ copy.failed }}
            <AppLink :href="`mailto:${email}`" class="font-bold underline decoration-2 underline-offset-4">{{ email }}</AppLink>.
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
