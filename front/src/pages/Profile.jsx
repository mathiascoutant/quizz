import { useState } from "react";
import { useSessionStore } from "../store/session.store";

function Profile() {
  const session = useSessionStore((state) => state.session);
  const [newData, setNewData] = useState({
    firstname: session.user.firstname,
    lastname: session.user.lastname,
    username: session.user.pseudo,
    email: session.user.email,
    coins: session.user.coins,
  });

  const fieledLabels = {
    firstname: "Prénom",
    lastname: "Nom",
    username: "Pseudo",
    email: "Email",
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = session.token;
      console.log(token);
      const { password, ...dataToSubmit } = newData;
      await fetch("http://localhost:3002/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSubmit),
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
    }
  };

  const renderField = (name) => {
    return (
      <label id="label-form">
        {fieledLabels[name]}
        <br />
        <input
          id="input-form"
          name={name}
          type={name === "password" ? "password" : "text"}
          value={newData[name]}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2"
        ></input>
        <br/>
      </label>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h1 className="text-4xl font-bold mb-4">Mon compte</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(newData).filter((key) => key !== "coins").map((name) => renderField(name))}
        <label className="block mb-4">
          Number of coins: <b>{session.user.coins}</b>
        </label>
        <button type="submit" className="bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 transition duration-300">
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
}

export default Profile;