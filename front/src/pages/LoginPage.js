import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import loginImage from '../assets/inscription.jpg';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Données du formulaire de connexion:', formData);
  };

  return (
    <div className="flex h-screen">
      {/* Image à gauche */}
      <div className="w-1/2">
        <img src={loginImage} alt="login" className="w-full h-full object-cover" />
      </div>

      {/* Formulaire à droite */}
      <div className="w-1/2 bg-white p-12 flex flex-col">
        <h2 className="text-3xl font-bold text-purple-700 mb-12">QuizzGo</h2>
        <div className="flex-grow flex items-center justify-center">
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mb-8 text-gray-800">Connexion</h1>
            <div className="mb-6">
              <input
                className="w-full px-3 py-2 text-gray-700 border-b-2 border-gray-300 focus:outline-none focus:border-purple-500 transition-colors"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Adresse e-mail"
                required
              />
            </div>
            <div className="mb-8">
              <input
                className="w-full px-3 py-2 text-gray-700 border-b-2 border-gray-300 focus:outline-none focus:border-purple-500 transition-colors"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mot de passe"
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors"
            >
              Se connecter
            </button>
            <div className="text-center mt-6">
              <Link to="/register" className="text-purple-600 hover:text-purple-800 transition-colors">
                Pas encore inscrit ? S'inscrire
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
