'use client';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  centerMode: true,
  centerPadding: '0',
  className: 'center',
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
  ],
};

interface Testimonial {
  name: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Mathias Coutant',
    text: "QuizzGo a révolutionné ma façon d'apprendre. C'est addictif et tellement gratifiant !",
  },
  {
    name: 'Lenny Copeaux',
    text: "J'adore gagner des Miams en testant mes connaissances. C'est la meilleure façon de s'instruire en s'amusant.",
  },
  {
    name: 'Jonathan Piboteau',
    text: "Les quiz sont variés et stimulants. J'ai déjà échangé mes Miams contre plusieurs récompenses géniales !",
  },
  {
    name: 'Idryss Judéaux',
    text: "QuizzGo est devenu ma pause préférée au travail. C'est amusant, éducatif et récompensant à la fois.",
  },
  {
    name: 'William Fort',
    text: "Avec QuizzGo, j'apprends chaque jour. C'est une façon ludique d'enrichir ma culture générale.",
  },
];

export const Testimonials = () => {
  return (
    <div className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Ce que disent nos joueurs
        </h2>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-4 focus:outline-none">
              <div className="bg-purple-100 p-8 rounded-lg shadow-lg max-w-2xl mx-auto transform transition-all duration-300">
                <p className="text-lg italic mb-4">
                  &quot;{testimonial.text}&quot;
                </p>
                <p className="font-bold text-purple-600">
                  - {testimonial.name}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
