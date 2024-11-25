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
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Testimonial Section */}
      <Testimonials />

      {/* Catégories de Quiz Section */}
      <Categories />
      {/* CTA Section */}
      {/* {session ? null : (
        <div className="bg-purple-600 text-white py-16">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Prêt à vous régaler de connaissances ?
            </h2>
            <p className="text-xl mb-8">
              Rejoignez QuizzGo dès maintenant et commencez à accumuler des
              Miams !
            </p>
            <button className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300">
              S&apos;inscrire gratuitement
            </button>
          </div>
        </div>
      )} */}
    </section>
  );
}