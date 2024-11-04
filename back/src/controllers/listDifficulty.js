import CoinModel from '../models/coinModel.js';

// Récupérer toutes les difficultés
export const getLevels = async (req, res) => {
    try {
        const difficulties = await CoinModel.findAll({
            attributes: ['id', 'difficulty'] // Sélectionner uniquement l'id et la difficulté
        });
        res.status(200).json(difficulties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
