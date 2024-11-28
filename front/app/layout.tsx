import TanstackQueryProvider from '@/providers/TanstackQueryProvider';
import { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
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
      <body className={montserrat.className}>
        <TanstackQueryProvider>
          <Toaster />
          {children}
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
