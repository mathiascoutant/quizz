import { Category } from '../models/categoryModel.js';
import { Question } from '../models/questionModel.js';
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

    const whereClause = {
      category: category,
      difficulty: difficulty,
    };

    // Ajuster la clause WHERE en fonction du nombre de réponses
    if (numberOfAnswers === 2) {
      whereClause.choice3 = null;
      whereClause.choice4 = null;
    } else if (numberOfAnswers === 3) {
      whereClause.choice3 = { [Sequelize.Op.ne]: null };
      whereClause.choice4 = null;
    } else if (numberOfAnswers === 4) {
      whereClause.choice3 = { [Sequelize.Op.ne]: null };
      whereClause.choice4 = { [Sequelize.Op.ne]: null };
    }

    const question = await Question.findOne({
      where: whereClause,
      order: Sequelize.literal('RAND()'), // Pour MySQL
      // Si vous utilisez PostgreSQL, utilisez : order: Sequelize.fn('RANDOM')
    });

    if (!question) {
      return res.status(404).json({ message: "Aucune question trouvée avec ces critères" });
    }

    // Formater la réponse
    const formattedQuestion = {
      id: question.id,
      category: question.category,
      questionText: question.questionText,
      difficulty: question.difficulty,
      choices: [
        question.choice1,
        question.choice2,
        question.choice3,
        question.choice4
      ].filter(choice => choice !== null),
      correctAnswer: question.correctAnswer
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
