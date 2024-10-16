import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import quizImage from '../assets/quizz-image.png'; // Assurez-vous d'avoir cette image dans vos assets
import { FaBrain, FaCoins, FaGift } from 'react-icons/fa'; // Assurez-vous d'installer react-icons

function HomePage() {
  const testimonials = [
    {
      name: "Mathias Coutant",
      text: "QuizzGo a révolutionné ma façon d'apprendre. C'est addictif et tellement gratifiant !"
    },
    {
      name: "Lenny Copeaux",
      text: "J'adore gagner des Miams en testant mes connaissances. C'est la meilleure façon de s'instruire en s'amusant."
    },
    {
      name: "Jonathan Piboteau",
      text: "Les quiz sont variés et stimulants. J'ai déjà échangé mes Miams contre plusieurs récompenses géniales !"
    },
    {
      name: "Idryss Judéaux",
      text: "QuizzGo est devenu ma pause préférée au travail. C'est amusant, éducatif et récompensant à la fois."
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="py-16 md:py-24 lg:py-32 min-h-[60vh] flex items-center">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h1 className="text-4xl font-bold mb-4">Bienvenue sur QuizzGo !</h1>
            <p className="text-xl mb-6">
              Jouez, apprenez et récoltez des Miams avec nos quiz savoureux !
              Transformez votre savoir en récompenses délicieuses.
            </p>
            <button className="bg-purple-600 text-white font-bold py-3 px-6 rounded-full hover:bg-purple-700 transition duration-300">
              Commencer l'aventure
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center items-center">
            <img 
              src={quizImage} 
              alt="Quiz en action" 
              className="w-full max-w-xl lg:max-w-2xl xl:max-w-3xl h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <h2 className="text-3xl font-bold text-center mb-12">Comment ça marche ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FaBrain className="text-5xl text-purple-600" />}
              title="Testez vos connaissances"
              description="Participez à des quiz variés et stimulants sur de nombreux sujets."
            />
            <FeatureCard 
              icon={<FaCoins className="text-5xl text-yellow-500" />}
              title="Gagnez des Miams"
              description="Chaque bonne réponse vous rapporte des Miams, mais attention aux erreurs !"
            />
            <FeatureCard 
              icon={<FaGift className="text-5xl text-green-500" />}
              title="Échangez vos récompenses"
              description="Transformez vos Miams en cartes cadeaux, bons d'achat et réductions."
            />
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <h2 className="text-3xl font-bold text-center mb-12">Ce que disent nos joueurs</h2>
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-4">
                <div className="bg-purple-100 p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
                  <p className="text-lg italic mb-4">"{testimonial.text}"</p>
                  <p className="font-bold text-purple-600">- {testimonial.name}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-600 text-white py-16">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à vous régaler de connaissances ?</h2>
          <p className="text-xl mb-8">Rejoignez QuizzGo dès maintenant et commencez à accumuler des Miams !</p>
          <button className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300">
            S'inscrire gratuitement
          </button>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default HomePage;
