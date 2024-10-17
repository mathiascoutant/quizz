import { Category } from '../models/categoryModel.js';
import { Form } from '../models/questionModel.js';
import { Sequelize } from 'sequelize';

export const getCategories = async (req, res) => {
  try {
    console.log('Début de getCategories');
    const categories = await Category.findAll({
      attributes: ['id', 'name'], // Spécifiez les attributs que vous voulez récupérer
      order: [['name', 'ASC']], // Triez par nom en ordre ascendant
    });
    console.log('Catégories récupérées:', Category);
    res.status(200).json(categories);
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
    res.status(500).json({ 
      message: "Erreur lors de la récupération des catégories", 
      error: error.message 
    });
  }
};

export const getEnter = async (req, res) => {
  try {
    const { category, difficulty, numberOfAnswers } = req.body;

    if (!category || !difficulty || !numberOfAnswers) {
      return res.status(400).json({ message: "Catégorie, difficulté et nombre de réponses sont requis" });
    }

    const form = await Form.findOne({
      where: {
        '$Category.name$': category,
        '$Coin.difficulty$': difficulty,
        [Sequelize.where(Sequelize.fn('JSON_LENGTH', Sequelize.col('possibleAnswers')), numberOfAnswers)]: true
      },
      include: [
        { model: Category, attributes: ['name'] },
        { model: Coins, attributes: ['difficulty'] }
      ],
      order: Sequelize.literal('RAND()'), // Pour MySQL
      // Si vous utilisez PostgreSQL, utilisez : order: Sequelize.fn('RANDOM')
    });

    if (!form) {
      return res.status(404).json({ message: "Aucune question trouvée avec ces critères" });
    }

    // Formater la réponse
    const formattedQuestion = {
      id: form.id,
      category: form.Category.name,
      content: form.content,
      difficulty: form.Coin.difficulty,
      possibleAnswers: form.possibleAnswers,
      correctAnswer: form.correctAnswer
    };

    res.status(200).json(formattedQuestion);
  } catch (error) {
    console.error("Erreur lors de la récupération de la question:", error);
    res.status(500).json({ 
      message: "Erreur lors de la récupération de la question", 
      error: error.message 
    });
  }
};
