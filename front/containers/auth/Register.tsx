'use client';
import { Button } from '@/components/common/Button';
import { useRegister } from '@/hooks/useRegister';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    pseudo: '',
    email: '',
    password: '',
  });

  const { error, isPending, mutate } = useRegister({
    email: formData.email,
    password: formData.password,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      mutate(formData);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Une erreur est survenue lors de l'inscription");
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 bg-white p-12 flex flex-col">
        <div>
          <Link
            href="/"
            className="text-3xl font-bold text-purple-700 mb-12 hover:text-purple-800 transition-colors"
          >
            QuizzGo
          </Link>
        </div>
        <div className="flex-grow flex items-center justify-center">
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mb-8 text-gray-800">
              Inscription
            </h1>
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
            {error ? (
              <small className="text-red-700">{error.message}</small>
            ) : null}
            <Button type="submit" isLoading={isPending} className="w-full">
              S&apos;inscrire
            </Button>
            <div className="text-center mt-6">
              <Link
                href="/login"
                className="text-purple-600 hover:text-purple-800 transition-colors"
              >
                Déjà inscrit ? Se connecter
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden md:w-1/2 md:block">
        <Image
          src={'/assets/inscription.jpg'}
          alt="inscription"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
