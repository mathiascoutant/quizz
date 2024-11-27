"use client";
import { useGetRanking } from "@/hooks/useGetRanking";
import { useSessionStore } from "@/store/session.store";
export const Ranking = () => {
  const { data: ranking, isLoading } = useGetRanking();
  const { session } = useSessionStore();

  if (isLoading || !ranking) {
    return <div>Loading...</div>;
  }

  const userInRanking = ranking.topUsers.some(player => player.id === session?.user.id);

  return (
    <section className="my-24 max-w-[80%] mx-auto space-y-12">
      <div className="main-container">
        <div className="container">
          <h1 className="text-2xl font-bold text-center">Classement des utilisateurs</h1>
          <table className="ranking-table w-full border-collapse mt-5 border">
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
                  <tr key={index} className={`${player.id === session?.user.id ? 'bg-blue-200' : (index % 2 === 0 ? 'bg-gray-100' : '')} ${index === 2 ? 'border-b-2 border-black' : ''}`}>
                    <td className="p-2 border text-center">{medalIcon || index + 1}</td>
                    <td className="p-2 border text-center">
                      {player.id === session?.user.id ? <b><i>(Vous) </i></b> : ''}{player.pseudo}
                    </td>
                    <td className="p-2 border text-center">{player.coins}</td>
                  </tr>
                );
              })}
              {!userInRanking && (
                <tr className="bg-blue-200">
                  <td className="p-2 border text-center">{ranking.currentUser.position}</td>
                  <td className="p-2 border text-center"><b><i>(Vous)</i></b> {ranking.currentUser.pseudo}</td>
                  <td className="p-2 border text-center">{ranking.currentUser.coins}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
