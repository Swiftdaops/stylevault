export const metadata = {
  title: 'About | StyleVault',
  description: 'About StyleVault — discover and book barbers online in Nigeria.',
};

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-orange-50 px-4 py-12 text-stone-950 dark:bg-black dark:text-amber-500">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold">About StyleVault</h1>
        <p className="mt-4 text-lg text-stone-700 dark:text-amber-200">
          StyleVault helps customers find local barbers, compare services and book appointments online. We build tools that connect customers and barbers with real-time availability and simple scheduling.
        </p>
      </div>
    </section>
  );
}
