// Utility helpers used across the app (minimal shadcn-style `cn` helper)
export function cn(...inputs) {
  const classes = []

  const toClass = (value) => {
    if (!value && value !== 0) return ""
    if (typeof value === "string" || typeof value === "number") return String(value)
    if (Array.isArray(value)) return value.map(toClass).filter(Boolean).join(" ")
    if (typeof value === "object") return Object.keys(value).filter((k) => value[k]).join(" ")
    return ""
  }

  for (const input of inputs) {
    const out = toClass(input)
    if (out) classes.push(out)
  }

  return classes.join(" ")
}

export default cn
