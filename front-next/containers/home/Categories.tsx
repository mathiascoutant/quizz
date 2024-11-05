'use client';

import { Modal } from '@/components/Modal';
import { useGetCategories } from '@/hooks/useGetCategories';
import { useSessionStore } from '@/store/session.store';
import { cn } from '@/utils/utils';
import { Fragment, useState } from 'react';

export const Categories = () => {
  const [displayedCategories, setDisplayedCategories] = useState<number>(6);
  const [showAllCategories, setShowAllCategories] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const { data: categories, isLoading } = useGetCategories();
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

  if (!categories || isLoading) return 'Chargement...';

  return (
    <div className="bg-purple-100 py-16">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Explorez nos catégories de quiz
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categories.slice(0, displayedCategories).map((category, index) => (
            <Fragment key={index}>
              <CategoryCard
                category={category}
                setSelectedCategory={setSelectedCategory}
                isConnected={!!session?.user}
              />

              {selectedCategory && selectedCategory.name === category.name && (
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
  category: Category;
  setSelectedCategory: (category: Category) => void;
  isConnected: boolean;
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
}: CategoryCardProps) {
  return (
    <div
      onClick={() => setSelectedCategory(category)}
      className={cn(
        'bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-purple-50',
        {
          'pointer-events-none opacity-50': !isConnected,
        }
      )}
    >
      <div className="mb-4">{category.icon}</div>
      <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
      <p className="text-sm">{category.shortDescription}</p>
    </div>
  );
}
