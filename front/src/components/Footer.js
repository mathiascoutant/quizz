import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 max-w-6xl">
            <div>
              <h3 className="text-xl font-bold mb-4">QuizzGo</h3>
              <p className="mb-4">Apprenez, jouez et gagnez des récompenses avec nos quiz savoureux !</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  <FaFacebook size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  <FaTwitter size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  <FaInstagram size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-purple-400 transition-colors duration-300">Accueil</Link></li>
                <li><Link to="/quizz" className="hover:text-purple-400 transition-colors duration-300">Jouer</Link></li>
                <li><Link to="/statistiques" className="hover:text-purple-400 transition-colors duration-300">Statistiques</Link></li>
                <li><Link to="/register" className="hover:text-purple-400 transition-colors duration-300">S'inscrire</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Catégories populaires</h4>
              <ul className="space-y-2">
                <li><Link to="/categorie/histoire" className="hover:text-purple-400 transition-colors duration-300">Histoire</Link></li>
                <li><Link to="/categorie/sciences" className="hover:text-purple-400 transition-colors duration-300">Sciences</Link></li>
                <li><Link to="/categorie/culture-generale" className="hover:text-purple-400 transition-colors duration-300">Culture générale</Link></li>
                <li><Link to="/categorie/geographie" className="hover:text-purple-400 transition-colors duration-300">Géographie</Link></li>
                <li><Link to="/categories" className="hover:text-purple-400 transition-colors duration-300">Toutes les catégories</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Derniers quiz ajoutés</h4>
              <ul className="space-y-2">
                <li><Link to="/quiz/nouveau-quiz-1" className="hover:text-purple-400 transition-colors duration-300">Quiz sur les capitales</Link></li>
                <li><Link to="/quiz/nouveau-quiz-2" className="hover:text-purple-400 transition-colors duration-300">Les grands inventeurs</Link></li>
                <li><Link to="/quiz/nouveau-quiz-3" className="hover:text-purple-400 transition-colors duration-300">Mythologie grecque</Link></li>
                <li><Link to="/quiz/nouveau-quiz-4" className="hover:text-purple-400 transition-colors duration-300">Cinéma des années 90</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2023 QuizzGo. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
