import { cn } from '@/utils/utils';
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaArrowAltCircleUp,
  FaBrain,
  FaCoins,
  FaGift,
  FaQuestionCircle,
} from 'react-icons/fa';

export const Features = () => {
  return (
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
  );
};

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
};

function FeatureCard({
  icon,
  title,
  description,
  className,
}: FeatureCardProps) {
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
