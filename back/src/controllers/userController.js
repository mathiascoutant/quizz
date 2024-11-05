import { UserService } from '../services/userService.js';

export const getUserById = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur" });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json({ message: "Utilisateur créé avec succès", userId: user._id });
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création de l'utilisateur" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await UserService.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await UserService.deleteUser(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Token manquant" });

    const user = await UserService.getUserProfile(token);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.status(200).json(user);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Token invalide", error: error.message });
    }
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const getUserCoins = async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) return res.status(400).json({ message: "Token manquant" });

    const coins = await UserService.getUserCoins(token);
    if (coins === null) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.status(200).json({ coins });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Token invalide", error: error.message });
    }
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
