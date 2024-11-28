import { Button } from "@/components/common/Button";
import { api } from "@/services/api.service";
import { User, useSessionStore } from "@/store/session.store";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export const ProfileTab = () => {
  const { session, updateUser } = useSessionStore();
  const [pending, startTransition] = useTransition();

  const [newData, setNewData] = useState<Record<string, string | null>>({
    firstname: null,
    lastname: null,
    pseudo: null,
    email: null,
  });

  // État pour stocker les données initiales
  const [initialData, setInitialData] = useState<Record<string, string | null>>(
    {
      firstname: null,
      lastname: null,
      pseudo: null,
      email: null,
    }
  );

  useEffect(() => {
    if (session && session.user) {
      const userData = {
        firstname: session.user.firstname,
        lastname: session.user.lastname,
        pseudo: session.user.pseudo,
        email: session.user.email,
      };
      setNewData(userData);
      setInitialData(userData);
    }
  }, [session]);

  const fieledLabels = {
    firstname: "Prénom",
    lastname: "Nom",
    pseudo: "Pseudo",
    email: "Email",
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Fonction pour vérifier si les données ont été modifiées
  const isUpdated = () => {
    return JSON.stringify(newData) !== JSON.stringify(initialData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session || !session.user) {
      toast.error("La session utilisateur est introuvable.");
      return;
    }

    try {
      const { ...payload } = newData;

      startTransition(async () => {
        const response = await api(
          `/profile/update/${session.user.id}`,
          "PUT",
          payload
        );

        const data = (await response.json()) as {
          message: string;
          updatedUser: User;
        };

        const { message, updatedUser } = data;

        updateUser(updatedUser);

        toast.success(message);
      });
    } catch (error) {
      toast.error("Une erreur est survenue lors de la mise à jour du profil");
      if (error instanceof Error) {
        throw new Error(
          "Une erreur est survenue lors de la mise à jour du profil"
        );
      }
    }
  };

  const renderField = (name: keyof typeof fieledLabels, index: number) => {
    return (
      <div key={index} className="flex flex-col gap-2">
        <label id="label-form">{fieledLabels[name]}</label>
        <input
          id="input-form"
          name={name}
          type={"text"}
          defaultValue={newData[name] || ""}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2"
        />
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h1 className="text-4xl font-bold mb-4">Mon compte</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {Object.keys(newData).map((name, index) =>
          renderField(name as keyof typeof fieledLabels, index)
        )}
        <Button
          isLoading={pending}
          type="submit"
          className={`w-full opacity-50 ${
            isUpdated()
              ? "bg-purple-500 hover:bg-purple-700 opacity-100 text-white"
              : "bg-gray-300 text-gray-600"
          }`}
          disabled={!isUpdated()} // Désactive le bouton si aucune modification n'a été faite
        >
          Mettre à jour
        </Button>
      </form>
    </div>
  );
};
