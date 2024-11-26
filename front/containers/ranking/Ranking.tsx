"use client";
import { useGetRanking } from "@/hooks/useGetRanking";
import { data } from "framer-motion/client";
import { Fragment, useState } from "react";
export const Ranking = () => {
  const { data: ranking, isLoading } = useGetRanking();
  console.log("ranking", ranking);

  if (isLoading || !ranking) {
    return <div>Loading...</div>;
  }

  return (
    <section className="my-24 max-w-[80%] mx-auto space-y-12">
      <div className="main-container">
        <div className="container">
          <h1>Classement des utilisateurs</h1>
          <table className="ranking-table">
            <thead>
              <tr>
                <th>Rang</th>
                <th>Pseudo</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {ranking.topUsers.map((player, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{player.pseudo}</td>
                  <td>{player.coins}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <style jsx>{`
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            h1 {
              text-align: center;
            }
            .ranking-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            .ranking-table th,
            .ranking-table td {
              padding: 10px;
              text-align: center;
              border: 1px solid #ddd;
            }
            .ranking-table th {
              background-color: #f4f4f4;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};
