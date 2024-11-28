'use client';

import { Button } from '@/components/common/Button';
import { useLogin } from '@/hooks/useLogin';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { isPending, mutate, error } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      mutate(formData);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Une erreur est survenue lors de la connexion');
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 hidden md:block">
        <Image
          src={'/assets/inscription.jpg'}
          alt="login"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full object-cover"
        />
      </div>

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
            <h1 className="text-2xl font-bold mb-8 text-gray-800">Connexion</h1>
            {error && (
              <div className="mb-4 text-red-500 text-sm font-medium">
                {error.message}
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

            <Button type="submit" className="w-full" isLoading={isPending}>
              Se connecter
            </Button>

            <div className="text-center mt-6">
              <Link
                href="/register"
                className="text-purple-600 hover:text-purple-800 transition-colors"
              >
                Pas encore inscrit ? S&apos;inscrire
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
