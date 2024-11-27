'use client';

import { api } from '@/services/api.service';
import { Badge, useSessionStore } from '@/store/session.store';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const BadgesTab = () => {
  const session = useSessionStore((state) => state.session);
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    (async function () {
      if (!session) return;

      const response = await api('/badges/all');

      if (!response.ok) throw new Error('Error while retrieving badges');

      const data = await response.json();
      setBadges(data);
    })();
  }, []);

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
              src={`${badge.urlImage}`}
              alt={badge.name}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h2 className="text-xl font-semibold">{badge.name}</h2>
            <p>{badge.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
