import { useSessionStore } from '@/store/session.store';
import { useState } from 'react';

export const ProfileTab = () => {
  const session = useSessionStore((state) => state.session);

  const [newData, setNewData] = useState({
    firstname: session?.user.firstName,
    lastname: session?.user.lastName,
    username: session?.user.pseudo,
    email: session?.user.email,
  });

  const fieledLabels = {
    firstname: 'Prénom',
    lastname: 'Nom',
    username: 'Pseudo',
    email: 'Email',
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) return;

    try {
      const token = session.token;
      console.log(token);
      const { ...dataToSubmit } = newData;
      await fetch('http://localhost:3002/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSubmit),
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
    }
  };

  const renderField = (name: string) => {
    return (
      <label id="label-form">
        {fieledLabels[name]}
        <br />
        <input
          id="input-form"
          name={name}
          type={name === 'password' ? 'password' : 'text'}
          value={newData[name]}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2"
        ></input>
        <br />
      </label>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h1 className="text-4xl font-bold mb-4">Mon compte</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(newData)
          .filter((key) => key !== 'coins')
          .map((name) => renderField(name))}
        <label className="block mb-4">
          Number of coins: <b>{session.user.coins}</b>
        </label>
        <button
          type="submit"
          className="bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 transition duration-300"
        >
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
};
