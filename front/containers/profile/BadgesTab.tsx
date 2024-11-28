'use client';

import { useGetBadges } from '@/hooks/useGetBadges';
import { useSessionStore } from '@/store/session.store';
import Image from 'next/image';
import { BadgesLoader } from '../loaders/BadgesLoader';

export const BadgesTab = () => {
  const session = useSessionStore((state) => state.session);
  const { data: badges, isLoading } = useGetBadges();

  if (isLoading || !badges) return <BadgesLoader />;

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h1 className="text-4xl font-bold mb-4">Mes badges</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge, i) => (
          <div
            key={i}
            className={`border rounded-lg p-4 ${
              session?.user?.badges.some(
                (userBadge) => userBadge.id === badge.id
              )
                ? ''
                : 'opacity-50 blur-sm'
            }`}
          >
            <Image
              src={badge.urlImage ?? '/assets/image-fallback.png'}
              alt={badge.name}
              width={0}
              height={0}
              sizes="100vw"
              loading="lazy"
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h2 className="text-xl font-semibold text-center">{badge.name}</h2>
            <p>{badge.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
