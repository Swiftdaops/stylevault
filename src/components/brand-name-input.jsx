'use client'

export default function BrandNameInput({
  value,
  onChange,
  onBlur,
  errorText = '',
  suggestions = [],
  onSelectSuggestion,
  label = 'Brand name',
  labelClassName = '',
  inputClassName = '',
  previewClassName = 'mt-1 text-xs text-stone-500 dark:text-stone-400',
  suggestionsClassName = 'mt-2 flex flex-wrap gap-2',
  suggestionButtonClassName = 'rounded-full border px-3 py-1 text-xs font-medium transition hover:bg-stone-100 dark:hover:bg-stone-800',
  slugPreview = '',
  placeholder = 'Enter your brand name',
}) {
  return (
    <div>
      <label className={labelClassName}>{label}</label>
      <input
        type="text"
        required
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        aria-invalid={Boolean(errorText)}
        className={`mt-1 w-full ${inputClassName}`.trim()}
      />

      {slugPreview ? <p className={previewClassName}>Your slug will be: {slugPreview}</p> : null}
      {errorText ? <p className="mt-1 text-xs text-destructive">{errorText}</p> : null}

      {suggestions.length > 0 ? (
        <div className={suggestionsClassName}>
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.slug}
              type="button"
              onClick={() => onSelectSuggestion?.(suggestion)}
              className={suggestionButtonClassName}
            >
              {suggestion.name}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}