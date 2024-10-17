import { Levels } from '../models/levelModel.js';

export const getLevels = async (req, res) => {
  try {
    console.log('Début de getLevels');
    const levels = await Levels.findAll({
      attributes: ['id', 'Difficulty'], // Spécifiez les attributs que vous voulez récupérer
      order: [['Difficulty', 'ASC']], // Triez par nom en ordre ascendant
    });
    console.log('Levels récupérées:', Levels);
    res.status(200).json(levels);
  } catch (error) {
    console.error("Erreur lors de la récupération des levels:", error);
    res.status(500).json({ 
      message: "Erreur lors de la récupération des levels", 
      error: error.message 
    });
  }
};
