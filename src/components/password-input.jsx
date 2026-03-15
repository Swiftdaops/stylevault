'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function PasswordInput({
  label,
  value,
  onChange,
  labelClassName = '',
  inputClassName = '',
  required = true,
  minLength = 6,
  autoComplete = 'new-password',
  placeholder = 'Enter password',
  helpText = '',
}) {
  const [visible, setVisible] = useState(false)

  return (
    <div>
      <label className={labelClassName}>{label}</label>
      <div className="relative mt-1">
        <input
          type={visible ? 'text' : 'password'}
          required={required}
          minLength={minLength}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`${inputClassName} pr-12`}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="absolute inset-y-0 right-0 inline-flex items-center justify-center px-3 text-stone-500 transition hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {helpText ? <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">{helpText}</p> : null}
    </div>
  )
}