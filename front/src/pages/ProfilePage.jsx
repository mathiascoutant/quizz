import { useState } from "react";
import Profile from "./Profile";
import Badges from "./Badges";
import Statistics from "./Statistics";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("account");

  const renderContent = () => {
    switch (activeTab) {
      case "badges":
        return <Badges />;
      case "statistics":
        return <Statistics />;
      case "account":
      default:
        return <Profile />;
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg max-w-4xl mx-auto my-8">
      <p className="text-2xl font-semibold">Mon profil</p>
      <p className="text-lg text-gray-600">Gérez les paramètres de votre compte et définissez vos préférences de messagerie.</p>
      <hr className="my-4" />
      <div className="flex justify-center items-start">
      <nav className="w-1/4 bg-white text-gray-800 p-4 rounded-lg shadow-md border border-gray-300">
        <ul className="space-y-2">
          <li 
            onClick={() => setActiveTab("account")}
            className={`cursor-pointer p-2 rounded hover:bg-gray-200 ${activeTab === "account" ? "bg-gray-300" : ""}`}
          >
            Mon compte
          </li>
          <li 
            onClick={() => setActiveTab("badges")} 
            className={`cursor-pointer p-2 rounded hover:bg-gray-200 ${activeTab === "badges" ? "bg-gray-300" : ""}`}
          >
            Mes badges
          </li>
          <li 
            onClick={() => setActiveTab("statistics")} 
            className={`cursor-pointer p-2 rounded hover:bg-gray-200 ${activeTab === "statistics" ? "bg-gray-300" : ""}`}
          >
            Statistiques
          </li>
        </ul>
      </nav>
      <div className="w-3/4 ml-2">
        {renderContent()}
      </div>
    </div>
    </div>
  );
}

export default ProfilePage;
