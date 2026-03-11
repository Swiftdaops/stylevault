import BookPageClient from '@/components/book-page-client';

export const metadata = {
  title: 'Book Haircuts Online in Nigeria | StyleVault',
  description: 'Book haircut appointments online in Nigeria. Choose a barber, compare services, and reserve your next grooming session in minutes on StyleVault.',
  keywords: ['book haircut online', 'barber in nigeria', 'barber booking'],
  alternates: {
    canonical: '/book',
  },
  openGraph: {
    title: 'Book Haircuts Online in Nigeria | StyleVault',
    description: 'Book haircut appointments online in Nigeria. Choose a barber, compare services, and reserve your next grooming session in minutes on StyleVault.',
    url: '/book',
  },
};

export default function BookPage() {
  return <BookPageClient />;
}