import UserAnswer from '../models/userAnswerModel.js';
import Form from '../models/formModel.js';
import { User }  from '../models/userModel.js';  
import Coin from '../models/coinModel.js'; 
import { sequelize } from '../config/database.js';
import Category from '../models/categoryModel.js';

export const createUserAnswer = async (req, res) => {
  const { formId, userId, userAnswer } = req.body; 

  try {

    const form = await Form.findByPk(formId);
    if (!form) {
      return res.status(404).json({ message: 'Form not found.' });
    }

    const isCorrect = userAnswer === form.correctAnswer;
    let coinValue = 0; 

    if (isCorrect) {
      const coin = await Coin.findByPk(form.difficultyId); // Récupérer le coin correspondant à difficultyId
      if (coin) {
        coinValue = coin.coinValue; // Extraire coinValue de la ligne trouvée
      }
    }

  
    const newUserAnswer = await UserAnswer.create({ formId, userId, userAnswer, isCorrect, coinValue });
    
    res.status(201).json(newUserAnswer);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la réponse utilisateur.', error });
  }
};


// get all user answers
export const getAllUserAnswers = async (req, res) => {
  try {
    const userAnswers = await UserAnswer.findAll({
      include: [
        { model: Form, as: 'form' },
        { model: User, as: 'user' }
      ]
    });
    res.status(200).json(userAnswers);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des réponses utilisateurs.', error });
  }
};

// get an user answer by ID
export const getUserAnswerById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const userAnswer = await UserAnswer.findByPk(id, {
      include: [
        { model: Form, as: 'form' },
        { model: User, as: 'user' }
      ]
    });
    
    if (!userAnswer) {
      return res.status(404).json({ message: 'Réponse utilisateur non trouvée.' });
    }
    
    res.status(200).json(userAnswer);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la réponse utilisateur.', error });
  }
};


// Delete an user answer
export const deleteUserAnswer = async (req, res) => {
  const { id } = req.params;
  
  try {
    const userAnswerToDelete = await UserAnswer.findByPk(id);
    
    if (!userAnswerToDelete) {
      return res.status(404).json({ message: 'Réponse utilisateur non trouvée.' });
    }
    
    await userAnswerToDelete.destroy();
    res.status(200).json({ message: 'Réponse utilisateur supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la réponse utilisateur.', error });
  }
};


// Get all user answers by user ID
export const getUserAnswersByUserId = async (req, res) => {
  const { userId } = req.params; 
  
  try {
    const userAnswers = await UserAnswer.findAll({
      where: { userId: userId }, // Filtrer par userId
      include: [
        { model: Form, as: 'form' }, // Inclure le formulaire associé
        { model: User, as: 'user' } // Inclure l'utilisateur associé
      ]
    });
    
    if (userAnswers.length === 0) {
      return res.status(404).json({ message: 'Aucune réponse utilisateur trouvée pour cet utilisateur.' });
    }
    
    res.status(200).json(userAnswers); // Retourner toutes les réponses de l'utilisateur
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des réponses utilisateur.', error });
  }
};

export const getUserAnswersStats = async (req, res) => {
  const { userId } = req.params;
  console.log("userId", userId);
  try {
    const stats = await UserAnswer.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'totalAnswers'],
        [sequelize.fn('SUM', sequelize.literal('CASE WHEN isCorrect = true THEN 1 ELSE 0 END')), 'correctAnswers'],
        [sequelize.fn('SUM', sequelize.literal('CASE WHEN isCorrect = false THEN 1 ELSE 0 END')), 'incorrectAnswers']
      ],
      where: { userId },
      raw: true
    });

    if (stats[0].totalAnswers === 0) {
      return res.status(404).json({ message: 'Aucune réponse trouvée pour cet utilisateur.' });
    }

    const totalAnswers = stats[0].totalAnswers;
    const correctAnswers = stats[0].correctAnswers;
    const incorrectAnswers = stats[0].incorrectAnswers;
    const correctPercentage = ((correctAnswers / totalAnswers) * 100).toFixed(2);
    const incorrectPercentage = ((incorrectAnswers / totalAnswers) * 100).toFixed(2);

    res.status(200).json({
      userId,
      totalAnswers:`${totalAnswers}`,
      correctPercentage: `${correctPercentage}%`,
      incorrectPercentage: `${incorrectPercentage}%`
    });
  } catch (error) {
    console.error("Error fetching user answer stats:", error);
    res.status(500).json({ error: "An error occurred while fetching user answer stats." });
  }
};


export const getUserAnswersStatsByCategory = async (req, res) => {
  const { userId } = req.params;

  try {
    
    const answersByCategory = await UserAnswer.findAll({
      attributes: [
        [sequelize.col('form.categoryId'), 'categoryId'], 
        [sequelize.fn('COUNT', sequelize.col('UserAnswer.id')), 'totalAnswers'],
        [sequelize.fn('SUM', sequelize.literal('CASE WHEN UserAnswer.isCorrect = true THEN 1 ELSE 0 END')), 'correctAnswers'],
        [sequelize.fn('SUM', sequelize.literal('CASE WHEN UserAnswer.isCorrect = false THEN 1 ELSE 0 END')), 'incorrectAnswers']
      ],
      where: { userId },
      include: [
        {
          model: Form,
          as: 'form', 
          attributes: [], 
        }
      ],
      group: ['form.categoryId'], // Groupement par categoryId
      raw: true
    });

    if (answersByCategory.length === 0) {
      return res.status(404).json({ message: 'Aucune réponse trouvée pour cet utilisateur.' });
    }

    
    const getCategoryName = async (categoryId) => {
      const category = await Category.findOne({
        attributes: ['name'],
        where: { id: categoryId }
      });
      return category ? category.name : null;
    };

    // Calculer les pourcentages et récupérer le nom de chaque catégorie
    const detailedAnswersByCategory = await Promise.all(
      answersByCategory.map(async category => {
        const { categoryId, totalAnswers, correctAnswers, incorrectAnswers } = category;
        const correctPercentage = ((correctAnswers / totalAnswers) * 100).toFixed(2);
        const incorrectPercentage = ((incorrectAnswers / totalAnswers) * 100).toFixed(2);
        const categoryName = await getCategoryName(categoryId); 

        return {
          categoryId,
          categoryName, 
          totalAnswers,
          correctAnswers,
          incorrectAnswers,
          correctPercentage: `${correctPercentage}%`,
          incorrectPercentage: `${incorrectPercentage}%`
        };
      })
    );

    res.status(200).json({
      userId,
      answersByCategory: detailedAnswersByCategory
    });
  } catch (error) {
    console.error("Error fetching user answer stats by category:", error);
    res.status(500).json({ error: "An error occurred while fetching user answer stats." });
  }
};
