import { ButtonLink } from '@/components/common/Button';
import Image from 'next/image';

export const Hero = () => {
  return (
    <div className="py-16 md:py-24 lg:py-32 min-h-[60vh] flex items-center">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold mb-4">Bienvenue sur QuizzGo !</h1>
          <p className="text-xl mb-6">
            Jouez, apprenez et récoltez des Miams avec nos quiz savoureux !
            Transformez votre savoir en récompenses délicieuses.
          </p>
          <ButtonLink href={'/register'}>Commencer l&apos;aventure</ButtonLink>
        </div>
        <div className="md:w-1/2 flex justify-center items-center">
          <Image
            src={'/assets/quizz-image.png'}
            alt="Quiz en action"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full max-w-xl lg:max-w-2xl xl:max-w-3xl h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};