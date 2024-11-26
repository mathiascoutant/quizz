import { Bandeau } from '@/containers/home/Bandeau';
import { Categories } from '@/containers/home/Categories';
import { Features } from '@/containers/home/Features';
import { Hero } from '@/containers/home/Hero';
import { Testimonials } from '@/containers/home/Testimonials';
import { Metadata } from 'next';

export const medatata: Metadata = {
  title: 'QuizzGo - Quiz pour apprendre et gagner des Miams',
  description:
    'QuizzGo est un site web qui vous propose des quiz pour apprendre et gagner des Miams. Retrouvez des quiz variés et stimulants pour améliorer votre savoir et récolter des Miams.',
};

export default async function Home() {
  return (
    <section className="bg-gray-100">
      <Hero />
      <Features />
      <Testimonials />
      <Categories />
      <Bandeau />
    </section>
  );
}
