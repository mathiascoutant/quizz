import TanstackQueryProvider from '@/providers/TanstackQueryProvider';
import { Metadata } from 'next';
import './globals.css';

export const medatata: Metadata = {
  title: 'QuizzGo - Quiz pour apprendre et gagner des Miams',
  description:
    'QuizzGo est un site web qui vous propose des quiz pour apprendre et gagner des Miams. Retrouvez des quiz variés et stimulants pour améliorer votre savoir et récolter des Miams.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="">
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
      </body>
    </html>
  );
}
