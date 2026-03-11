export const metadata = {
  title: 'Contact | StyleVault',
  description: 'Contact StyleVault support and partnership inquiries.',
};

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-orange-50 px-4 py-12 text-stone-950 dark:bg-black dark:text-amber-500">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold">Contact</h1>
        <p className="mt-4 text-lg text-stone-700 dark:text-amber-200">
          For support or partnership inquiries, email us at <a href="mailto:hello@stylevault.store" className="underline">hello@stylevault.store</a>.
        </p>
      </div>
    </section>
  );
}
