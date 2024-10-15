const User = require('../models/User');
const { hashPassword } = require('../utils/passwordUtils');

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Utilisateur créé avec succès", userId: newUser._id });
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création de l'utilisateur" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email },
      { new: true }
    ).select('-password');
    if (!updatedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" });
  }
};

