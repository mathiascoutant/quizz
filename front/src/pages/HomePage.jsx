import { Fragment, useEffect, useState } from 'react';
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaArrowAltCircleUp,
  FaBrain,
  FaCoins,
  FaGift,
  FaLongArrowAltRight,
  FaQuestionCircle
} from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import quizImage from '../assets/quizz-image.png';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { cn } from '../utils/utils';
import './HomePage.css';
import { getCategoryIcon } from '../utils/categoryIcons';

function HomePage() {
  const testimonials = [
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
      text: "Grâce à QuizzGo, j'apprends quelque chose de nouveau chaque jour. C'est une façon ludique et motivante d'enrichir sa culture générale.",
    },
  ];

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/categories');
      const data = await response.json();
      const processedCategories = processCategories(data);
      setCategories(processedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

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

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [displayedCategories, setDisplayedCategories] = useState(6);
  const [showAllCategories, setShowAllCategories] = useState(false);

  

  const toggleCategoriesDisplay = () => {
    if (showAllCategories) {
      setDisplayedCategories(6);
      setShowAllCategories(false);
    } else {
      setDisplayedCategories(categories.length);
      setShowAllCategories(true);
    }
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
            <Button href={'/register'}>Commencer l'aventure</Button>
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
          <h2 className="text-3xl font-bold text-center mb-12">
            Comment ça marche ?
          </h2>

          <div className="grid grid-cols-1 place-items-center lg:grid-cols-[minmax(350px,_1fr)_auto]  lg:grid-rows-[min-content_auto] gap-6 max-w-3xl mx-auto">
            <FeatureCard
              className="row-start-1"
              icon={<FaQuestionCircle className="text-4xl text-purple-600" />}
              title="1. Choisissez un quiz"
              description="Parcourez notre large sélection de quiz dans différentes catégories."
            />
            <FaArrowAltCircleRight className="text-purple-600 rotate-90 row-start-2 lg:row-start-1 lg:rotate-0 text-4xl" />
            <FeatureCard
              className="row-start-3 lg:row-start-1"
              icon={<FaBrain className="text-4xl text-blue-500" />}
              title="2. Répondez aux questions"
              description="Mettez vos connaissances à l'épreuve en répondant aux questions."
            />
            <FaArrowAltCircleDown className="text-purple-600 row-start-4 text-4xl lg:row-start-2 lg:col-start-3" />
            <FeatureCard
              className="row-start-7 lg:row-start-3 lg:col-start-1"
              icon={<FaGift className="text-4xl text-green-500" />}
              title="4. Échangez vos récompenses"
              description="Utilisez vos Miams pour obtenir des récompenses exclusives."
            />
            <FaArrowAltCircleLeft className="text-purple-600 -rotate-90 lg:rotate-0 text-4xl row-start-6 lg:row-start-3 lg:col-start-2" />
            <FeatureCard
              className="row-start-5 lg:row-start-3 lg:col-start-3"
              icon={<FaCoins className="text-4xl text-yellow-500" />}
              title="3. Gagnez des Miams"
              description="Accumulez des Miams pour chaque bonne réponse et quiz terminé."
            />
            <FaArrowAltCircleUp className="text-purple-600 hidden lg:block text-4xl row-start-6 lg:row-start-2 lg:col-start-1" />
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Ce que disent nos joueurs
          </h2>
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-4 focus:outline-none">
                <div className="bg-purple-100 p-8 rounded-lg shadow-lg max-w-2xl mx-auto transform transition-all duration-300">
                  <p className="text-lg italic mb-4">"{testimonial.text}"</p>
                  <p className="font-bold text-purple-600">
                    - {testimonial.name}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Catégories de Quiz Section */}
      <div className="bg-purple-100 py-16">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explorez nos catégories de quiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {categories.slice(0, displayedCategories).map((category, index) => (
              <Fragment>
                <CategoryCard
                  icon={category.icon}
                  title={category.title}
                  description={category.description}
                  onClick={() => handleCategoryClick(category)}
                  setSelectedCategory={setSelectedCategory}
                />

                {selectedCategory === category.title && (
                  <Modal
                    setSelectedCategory={setSelectedCategory}
                    title={category.title}
                    path={`/categories/${category.title}/quizz`}
                  >
                    <p>{category.description}</p>
                  </Modal>
                )}
              </Fragment>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={toggleCategoriesDisplay}
              className="inline-flex items-center text-purple-700 font-medium text-lg focus:outline-none"
            >
              <span className="h-px w-12 bg-purple-600 mr-3"></span>
              <span className="hover:underline italic">
                {showAllCategories ? 'Voir moins' : 'Afficher plus'}
              </span>
              <span className="h-px w-12 bg-purple-600 ml-3"></span>
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-600 text-white py-16">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Prêt à vous régaler de connaissances ?
          </h2>
          <p className="text-xl mb-8">
            Rejoignez QuizzGo dès maintenant et commencez à accumuler des Miams
            !
          </p>
          <button className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300">
            S'inscrire gratuitement
          </button>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, className }) {
  return (
    <div
      className={cn(
        'bg-gray-50 rounded-lg shadow-md p-6 flex flex-col h-full max-w-[375px] min-w-[350px]',
        className
      )}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-center">{title}</h3>
      <p className="text-sm text-center flex-grow">{description}</p>
    </div>
  );
}

function CategoryCard({ icon, title, description, setSelectedCategory }) {
  return (
    <div
      onClick={() => setSelectedCategory(title)}
      className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-purple-50"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
}

const handleCategoryClick = (category) => {
  console.log(`Clicked on category: ${category.title}`);
};

const processCategories = (categories) => {
  const description = "Explorez cette catégorie passionnante et testez vos connaissances !";
  
  return categories.map(category => ({
    icon: getCategoryIcon(category.name),
    title: category.name,
    description: description
  }));
};

export default HomePage;
