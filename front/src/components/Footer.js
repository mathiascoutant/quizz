import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">QuizzGo</h3>
            <p className="mb-4">Apprenez, jouez et gagnez des récompenses avec nos quiz savoureux !</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-purple-400 transition-colors duration-300"><FaFacebookF /></a>
              <a href="#" className="hover:text-purple-400 transition-colors duration-300"><FaTwitter /></a>
              <a href="#" className="hover:text-purple-400 transition-colors duration-300"><FaInstagram /></a>
              <a href="#" className="hover:text-purple-400 transition-colors duration-300"><FaLinkedinIn /></a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-purple-400 transition-colors duration-300">Accueil</Link></li>
              <li><Link to="/quizz" className="hover:text-purple-400 transition-colors duration-300">Jouer</Link></li>
              <li><Link to="/register" className="hover:text-purple-400 transition-colors duration-300">S'inscrire</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Aide</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">FAQ</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">Support</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">Conditions d'utilisation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="mb-4">Restez informé de nos derniers quiz et offres !</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="bg-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-600 flex-grow"
              />
              <button 
                type="submit" 
                className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700 transition-colors duration-300"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2024 QuizzGo. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
