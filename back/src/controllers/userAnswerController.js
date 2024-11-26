import { UserAnswerService } from '../services/userAnswerService.js';
import { UserAnswerRepository } from '../repositories/userAnswerRepository.js';
import { UserBadgeRepository } from '../repositories/userBadgesRepository.js';
import { BadgeRepository } from '../repositories/badgeRepository.js';
import BadgeModel from '../models/badgeModel.js';

export const createUserAnswer = async (req, res) => {
  try {
    const newUserAnswer = await UserAnswerService.createUserAnswer(req.body);
    const userId = req.body.userId;
    const correctAnswersCount = await UserAnswerRepository.countCorrectAnswers(userId);
    const badges = await BadgeRepository.findAll();
    let badgeCreated = null;
    for (const badge of badges) {
      badge.conditionValue = parseInt(badge.conditionValue);
      if (correctAnswersCount >= badge.conditionValue) {
        const alreadyHasBadge = await UserBadgeRepository.hasBadge(userId, badge.id);
          
        if (!alreadyHasBadge) {
            await UserBadgeRepository.createUserBadge(userId, badge.id);
            badgeCreated = await BadgeModel.findByPk(badge.id);
        }
      }
    }
    res.status(201).json({
      message: 'Réponse utilisateur créée avec succès et badges attribués si nécessaire.',
      newUserAnswer,
      badgeCreated
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Erreur lors de la création de la réponse utilisateur.',
      error: error.message
    });
  }
};

export const getAllUserAnswers = async (req, res) => {
  try {
    const userAnswers = await UserAnswerService.getAllUserAnswers();
    res.status(200).json(userAnswers);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des réponses utilisateurs.', error: error.message });
  }
};

export const getUserAnswerById = async (req, res) => {
  const { id } = req.params;
  try {
    const userAnswer = await UserAnswerService.getUserAnswerById(id);
    if (!userAnswer) {
      return res.status(404).json({ message: 'Réponse utilisateur non trouvée.' });
    }
    res.status(200).json(userAnswer);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la réponse utilisateur.', error: error.message });
  }
};

export const deleteUserAnswer = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUserAnswer = await UserAnswerService.deleteUserAnswerById(id);
    if (!deletedUserAnswer) {
      return res.status(404).json({ message: 'Réponse utilisateur non trouvée.' });
    }
    res.status(200).json({ message: 'Réponse utilisateur supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la réponse utilisateur.', error: error.message });
  }
};

export const getUserAnswersByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const userAnswers = await UserAnswerService.getUserAnswersByUserId(userId);
    if (userAnswers.length === 0) {
      return res.status(404).json({ message: 'Aucune réponse utilisateur trouvée pour cet utilisateur.' });
    }
    res.status(200).json(userAnswers);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des réponses utilisateur.', error: error.message });
  }
};

export const getUserAnswersStats = async (req, res) => {
  const { userId } = req.params;
  try {
    const stats = await UserAnswerService.getUserAnswerStats(userId);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des statistiques utilisateur.', error: error.message });
  }
};

export const getUserAnswersStatsByCategory = async (req, res) => {
  const { userId } = req.params;
  try {
    const answersByCategory = await UserAnswerService.getUserAnswerStatsByCategory(userId);
    res.status(200).json({
      userId,
      answersByCategory
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des statistiques par catégorie.', error: error.message });
  }
};


