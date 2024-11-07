import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import inscriptionImage from '../assets/inscription.jpg';

function RegisterPage() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    pseudo: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('http://localhost:3002/api/auth/register', formData);
      setSuccess('Inscription réussie ! Vous pouvez maintenant vous ');
      console.log('Réponse du serveur:', response.data);
      // Clear the form after successful registration
      setFormData({
        firstname: '',
        lastname: '',
        pseudo: '',
        email: '',
        password: '',
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Une erreur est survenue lors de l\'inscription');
      console.error('Erreur lors de l\'inscription:', error.response?.data || error.message);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-white p-12 flex flex-col">
        <Link to="/" className="text-3xl font-bold text-purple-700 mb-12 hover:text-purple-800 transition-colors">
          QuizzGo
        </Link>
        <div className="flex-grow flex items-center justify-center">
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mb-8 text-gray-800">Inscription</h1>
            <div className="mb-6">
              <input
                className="w-full px-3 py-2 text-gray-700 border-b-2 border-gray-300 focus:outline-none focus:border-purple-500 transition-colors"
                type="text"
                name="pseudo"
                value={formData.pseudo}
                onChange={handleChange}
                placeholder="Pseudo"
                required
              />
            </div>
            <div className="mb-6">
              <input
                className="w-full px-3 py-2 text-gray-700 border-b-2 border-gray-300 focus:outline-none focus:border-purple-500 transition-colors"
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="Prénom"
                required
              />
            </div>
            <div className="mb-6">
              <input
                className="w-full px-3 py-2 text-gray-700 border-b-2 border-gray-300 focus:outline-none focus:border-purple-500 transition-colors"
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Nom"
                required
              />
            </div>
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
            <div className="mb-6">
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
              S'inscrire
            </button>
            <div className="text-center mt-6">
              <Link to="/login" className="text-purple-600 hover:text-purple-800 transition-colors">
                Déjà inscrit ? Se connecter
              </Link> 
            </div>
          </form>
        </div>
      </div>

      <div className="w-1/2">
        <img src={inscriptionImage} alt="inscription" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default RegisterPage;
