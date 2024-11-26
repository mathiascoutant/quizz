'use client';

import { Modal } from '@/components/Modal';
import { useGetCategories } from '@/hooks/useGetCategories';
import { useGetCategoriesCompletion } from '@/hooks/useGetCategoriesCompletion';
import { useSessionStore } from '@/store/session.store';
import { cn } from '@/utils/utils';
import { motion } from 'framer-motion';
import { Fragment, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { CategoriesLoader } from '../loaders/CategoriesLoader';

export const Categories = () => {
  const [displayedCategories, setDisplayedCategories] = useState<number>(6);
  const [showAllCategories, setShowAllCategories] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const { data: categories, isLoading } = useGetCategories();
  const {
    data: categoriesCompletion,
    isLoading: isCategoriesCompletionLoading,
  } = useGetCategoriesCompletion();

  const session = useSessionStore((state) => state.session);

  const toggleCategoriesDisplay = () => {
    if (!categories) return;

    if (showAllCategories) {
      setDisplayedCategories(6);
      setShowAllCategories(false);
    } else {
      setDisplayedCategories(categories.length);
      setShowAllCategories(true);
    }
  };

  if (
    !categories ||
    isLoading ||
    !categoriesCompletion ||
    isCategoriesCompletionLoading
  )
    return <CategoriesLoader />;

  const modeledCategories = categories.map((category) => {
    const completion = categoriesCompletion.find((c) => c.id === category.id);
    if (!completion)
      return {
        ...category,
        completion: 0,
        totalQuestions: 0,
      };
    return {
      ...category,
      completion: completion.percentage,
      totalQuestions: completion.totalQuestions,
    };
  });

  return (
    <div className="bg-purple-100 py-16">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Explorez nos catégories de quiz
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {modeledCategories
            .slice(0, displayedCategories)
            .map((category, index) => (
              <Fragment key={index}>
                <CategoryCard
                  category={category}
                  setSelectedCategory={setSelectedCategory}
                  isConnected={!!session?.user}
                  isCompleted={category.completion === 100}
                />

                {selectedCategory &&
                  selectedCategory.name === category.name && (
                    <Modal
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                      title={category.name}
                      path={`/categories/${category.name}/quizz`}
                    >
                      <p>{category.longDescription}</p>
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
  );
};

type CategoryCardProps = {
  category: Category & { completion: number; totalQuestions: number };
  setSelectedCategory: (category: Category) => void;
  isConnected: boolean;
  isCompleted: boolean;
};

export interface Category {
  icon: React.ReactNode;
  name: string;
  shortDescription: string;
  longDescription: string;
  id: number;
}

function CategoryCard({
  category,
  setSelectedCategory,
  isConnected,
  isCompleted,
}: CategoryCardProps) {
  return (
    <div
      onClick={() => {
        if (isCompleted) return;
        setSelectedCategory(category);
      }}
      className={cn(
        `bg-white rounded-lg shadow-md p-6 relative text-center cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-purple-50`,
        {
          'pointer-events-none opacity-50': !isConnected,
          'ring ring-purple-500 pointer-events-none select-none': isCompleted,
        }
      )}
    >
      {isCompleted ? (
        <>
          <div className="absolute w-full h-full inset-0 bg-white/50 backdrop-blur-xl rounded-lg opacity-50 z-20"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2  gap-4 z-50 flex flex-col items-center justify-center -translate-y-1/2">
            <FaCheck className="text-purple-700 text-5xl relative " />
            <small className="text-purple-700 font-bold text-lg">
              Complété
            </small>
          </div>
        </>
      ) : null}
      <div
        className={cn('flex items-center flex-col', {
          'blur-[2px] ': isCompleted,
        })}
      >
        <div className="mb-4 ">{category.icon}</div>
        <h3 className="text-xl font-semibold mb-2 ">{category.name}</h3>
        <p className="text-sm ">{category.shortDescription}</p>
        <div className="space-y-2 w-full ">
          <p className="text-xs font-bold text-gray-500 mt-1 mb-2">
            {category.completion}% de questions répondues
          </p>

          {!isCompleted ? (
            <div className="w-full  bg-gray-300 h-2 rounded-full">
              <motion.div
                variants={{
                  initial: { width: 0 },
                  whileInView: {
                    width: `${category.completion}%`,
                    transition: {
                      duration: 0.5,
                      delay: 0.5,
                    },
                  },
                }}
                whileInView="whileInView"
                initial="initial"
                className="bg-purple-700 relative h-2 rounded-full"
              >
                {/* <IoIosRocket className="text-lg rotate-45 absolute text-purple-900 top-1/2 -translate-y-1/2 -right-2" /> */}
                {category.completion ? (
                  <img
                    src={'/assets/images/rocket.png'}
                    className="text-lg rotate-45 absolute text-purple-900 top-1/2 size-6 min-w-6 minh-h-6 -translate-y-1/2 -right-2"
                    alt=""
                  />
                ) : null}
              </motion.div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
