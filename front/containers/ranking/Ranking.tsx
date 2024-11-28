'use client';
import { Skeleton } from '@/components/common/Skeleton';
import { useGetRanking } from '@/hooks/useGetRanking';
import { useSessionStore } from '@/store/session.store';
export const Ranking = () => {
  const { data: ranking, isLoading } = useGetRanking();
  const { session } = useSessionStore();

  if (!session) return null;

  if (isLoading || !ranking) {
    return (
      <div className="bg-purple-100 py-16">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Classement des utilisateurs
          </h2>
          <div className="grid mb-12">
            {Array.from({ length: 1 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-[450px] mx-auto   " />
            ))}
          </div>
        </div>
      </div>
    );
  }

  console.log(ranking);

  const userInRanking = ranking.topUsers.some(
    (player) => player.id === Number(session?.user.id)
  );

  return (
    <div className="bg-purple-100 py-16">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Classement des utilisateurs
        </h2>
        <table className="ranking-table w-full rounded-lg border-collapse mt-5 border bg-white">
          <thead>
            <tr>
              <th className="p-2 border">Rang</th>
              <th className="p-2 border">Pseudo</th>
              <th className="p-2 border">Score</th>
            </tr>
          </thead>
          <tbody>
            {ranking.topUsers.map((player, index) => {
              let medalIcon = '';
              if (index === 0) {
                medalIcon = '🥇';
              } else if (index === 1) {
                medalIcon = '🥈';
              } else if (index === 2) {
                medalIcon = '🥉';
              }
              return (
                <tr
                  key={index}
                  className={`${
                    player.id === Number(session?.user.id)
                      ? 'bg-blue-200'
                      : index % 2 === 0
                      ? 'bg-gray-100'
                      : ''
                  } ${index === 2 ? 'border-b-2 border-black' : ''}`}
                >
                  <td className="p-2 border text-center">
                    {medalIcon || index + 1}
                  </td>
                  <td className="p-2 border text-center">
                    {player.id === Number(session?.user.id) ? (
                      <b>
                        <i>(Vous) </i>
                      </b>
                    ) : (
                      ''
                    )}
                    {player.pseudo}
                  </td>
                  <td className="p-2 border text-center">{player.coins}</td>
                </tr>
              );
            })}
            {!userInRanking && (
              <tr className="bg-blue-200">
                <td className="p-2 border text-center">
                  {ranking.currentUser.position}
                </td>
                <td className="p-2 border text-center">
                  <b>
                    <i>(Vous)</i>
                  </b>{' '}
                  {ranking.currentUser.pseudo}
                </td>
                <td className="p-2 border text-center">
                  {ranking.currentUser.coins}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
