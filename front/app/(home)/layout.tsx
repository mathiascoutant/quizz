import Footer from '@/layouts/Footer';
import Header from '@/layouts/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QuizzGo - Quiz pour apprendre et gagner des Miams',
  description:
    'QuizzGo est un site web qui vous propose des quiz pour apprendre et gagner des Miams. Retrouvez des quiz variés et stimulants pour améliorer votre savoir et récolter des Miams.',
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
