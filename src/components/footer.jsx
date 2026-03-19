import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white/60 text-sm text-stone-700 backdrop-blur-xl dark:border-white/10 dark:bg-stone-950/60 dark:text-stone-200">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-6 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <div>© {new Date().getFullYear()} StyleVault</div>

        <div className="flex items-center gap-4">
          <Link href="/about" className="transition hover:text-stone-950 dark:hover:text-white">About</Link>
          <Link href="/pricing" className="transition hover:text-stone-950 dark:hover:text-white">Pricing</Link>
          <Link href="/privacy-policy" className="transition hover:text-stone-950 dark:hover:text-white">Privacy</Link>
          <Link href="/contact" className="transition hover:text-stone-950 dark:hover:text-white">Contact</Link>
        </div>
      </div>
    </footer>
  )
}
