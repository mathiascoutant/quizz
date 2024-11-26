'use client';

import { useState } from 'react';
import { BadgesTab } from './BadgesTab';
import { StatisticsTab } from './StatisticsTab';
// import Badges from "./Badges";
// import Statistics from "./Statistics";

export const Profile = () => {
  const [activeTab, setActiveTab] = useState('account');

  // const renderContent = () => {
  //   switch (activeTab) {
  //     case 'badges':
  //       return <BadgesTab />;
  //     case 'statistics':
  //       return <StatisticsTab />;
  //     case 'account':
  //     default:
  //       return 'tg';
  //   }
  // };

  return (
    <section className="bg-gray-100 p-4 rounded-lg shadow-lg max-w-7xl mx-auto my-36">
      <p className="text-2xl font-semibold">Mon profil</p>
      <p className="text-lg text-gray-600">
        Gérez les paramètres de votre compte et définissez vos préférences de
        messagerie.
      </p>
      <hr className="my-4" />
      <div className="flex justify-center items-start">
        <nav className="w-1/5 bg-white text-gray-800 p-4 rounded-lg shadow-md border border-gray-300">
          <ul className="space-y-2">
            <li
              onClick={() => setActiveTab('account')}
              className={`cursor-pointer p-2 rounded hover:bg-gray-200 ${
                activeTab === 'account' ? 'bg-gray-300' : ''
              }`}
            >
              Mon compte
            </li>
            <li
              onClick={() => setActiveTab('badges')}
              className={`cursor-pointer p-2 rounded hover:bg-gray-200 ${
                activeTab === 'badges' ? 'bg-gray-300' : ''
              }`}
            >
              Mes badges
            </li>
            <li
              onClick={() => setActiveTab('statistics')}
              className={`cursor-pointer p-2 rounded hover:bg-gray-200 ${
                activeTab === 'statistics' ? 'bg-gray-300' : ''
              }`}
            >
              Statistiques
            </li>
          </ul>
        </nav>
        <div className="flex-1 ml-2">
          {/* {activeTab === 'account' && <ProfileTab />} */}
          {activeTab === 'badges' && <BadgesTab />}
          {activeTab === 'statistics' && <StatisticsTab />}
        </div>
      </div>
    </section>
  );
};
