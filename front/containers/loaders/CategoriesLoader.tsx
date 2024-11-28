import { Skeleton } from '@/components/common/Skeleton';

export const CategoriesLoader = () => {
  return (
    <div className="bg-purple-100 py-16">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Explorez nos catégories de quiz
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-[170px]" />
          ))}
        </div>
      </div>
    </div>
  );
};
