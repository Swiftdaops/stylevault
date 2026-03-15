'use client'

import { getPhoneHint, getPhonePlaceholder } from '@/lib/profile-options'

export default function PhoneNumberInput({
  country,
  value,
  onChange,
  label = 'WhatsApp number',
  labelClassName = '',
  inputClassName = '',
  hintClassName = 'mt-1 text-xs text-stone-500 dark:text-stone-400',
}) {
  const placeholder = getPhonePlaceholder(country)
  const hint = getPhoneHint(country)

  return (
    <div>
      <label className={labelClassName}>{label}</label>
      <input
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        required
        value={value}
        onChange={onChange}
        className={`mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 ${inputClassName}`}
        placeholder={placeholder}
      />
      <p className={hintClassName}>{hint}</p>
    </div>
  )
}