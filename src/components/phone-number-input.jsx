'use client'

import { getPhoneFormat, getPhoneHint, getPhonePlaceholder } from '@/lib/profile-options'

export default function PhoneNumberInput({
  country,
  value,
  onChange,
  onBlur,
  label = 'WhatsApp number',
  labelClassName = '',
  wrapperClassName = '',
  inputClassName = '',
  prefixClassName = '',
  hintClassName = 'mt-1 text-xs text-stone-500 dark:text-stone-400',
  errorText = '',
}) {
  const { dialCode } = getPhoneFormat(country)
  const placeholder = getPhonePlaceholder(country)
  const hint = getPhoneHint(country)

  return (
    <div>
      <label className={labelClassName}>{label}</label>
      <div className={`mt-1 flex overflow-hidden rounded-md border shadow-sm ${wrapperClassName}`.trim()}>
        <span className={`inline-flex items-center border-r px-3 text-sm font-medium ${prefixClassName}`.trim()}>
          {dialCode || '+'}
        </span>
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          required
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={Boolean(errorText)}
          className={`w-full border-0 px-3 py-2 focus:outline-none focus:ring-2 ${inputClassName}`}
          placeholder={placeholder}
        />
      </div>
      {errorText ? <p className="mt-1 text-xs text-destructive">{errorText}</p> : <p className={hintClassName}>{hint}</p>}
    </div>
  )
}