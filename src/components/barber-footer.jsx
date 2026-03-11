import Link from 'next/link'

export default function BarberFooter({ barber }) {
  return (
    <footer className="border-t border-orange-200/60 bg-white/90 dark:bg-stone-900/90 dark:border-stone-800 text-sm text-stone-700 dark:text-amber-300">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex flex-col items-center gap-3">
        <div className="text-center">Thank you for visiting {barber?.name || 'this barber shop'}.</div>
      </div>
    </footer>
  )
}
