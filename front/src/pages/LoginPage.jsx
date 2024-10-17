import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginImage from '../assets/inscription.jpg';
import { useSessionStore } from '../store/session.store';

function LoginPage() {
  const sessionLogIn = useSessionStore((state) => state.sessionLogIn);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        'http://localhost:3002/auth/login',
        formData
      );

      const { token, user } = data;

      console.log('Réponse du serveur:', { token, user });

      sessionLogIn({ token, user });

      navigate('/');
    } catch (error) {
      console.error(
        'Erreur de connexion:',
        error.response?.data?.message || error.message
      );
      if (error.response && error.response.status === 400) {
        setError('Adresse e-mail ou mot de passe invalide');
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    }
  };

  return (
    <div className="flex h-screen">
      {/* Image à gauche */}
      <div className="w-1/2">
        <img
          src={loginImage}
          alt="login"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Formulaire à droite */}
      <div className="w-1/2 bg-white p-12 flex flex-col">
        <h2 className="text-3xl font-bold text-purple-700 mb-12">QuizzGo</h2>
        <div className="flex-grow flex items-center justify-center">
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mb-8 text-gray-800">Connexion</h1>
            {error && (
              <div className="mb-4 text-red-500 text-sm font-medium">
                {error}
              </div>
            )}
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
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-600">
                  Se souvenir de moi
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-purple-600 hover:text-purple-800 transition-colors"
              >
                Mot de passe oublié ?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors"
            >
              Se connecter
            </button>
            <div className="text-center mt-6">
              <Link
                to="/register"
                className="text-purple-600 hover:text-purple-800 transition-colors"
              >
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
