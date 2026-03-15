export function isIOSBrowser() {
  if (typeof navigator === 'undefined') return false

  const userAgent = navigator.userAgent || ''
  return /iphone|ipad|ipod/i.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

export function isStandaloneDisplayMode() {
  if (typeof window === 'undefined') return false

  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true
}