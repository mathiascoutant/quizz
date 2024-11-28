import { Skeleton } from '@/components/common/Skeleton';

export const BadgesLoader = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <Skeleton className="w-[200px] h-[20px] mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-[186px] rounded-lg" />
        ))}
      </div>
    </div>
  );
};
