import { FormService } from '../services/formService.js';

// CRUD form
export const createForm = async (req, res) => {
  try {
    const newForm = await FormService.createForm(req.body);
    res.status(201).json(newForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getForms = async (req, res) => {
  try {
    const forms = await FormService.getAllForms();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving forms', error: error.message });
  }
};

export const getFormById = async (req, res) => {
  try {
    const form = await FormService.getFormById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving form', error: error.message });
  }
};

export const updateForm = async (req, res) => {
  try {
    const updatedForm = await FormService.updateForm(req.params.id, req.body);
    if (!updatedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json(updatedForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteForm = async (req, res) => {
  try {
    const deleted = await FormService.deleteForm(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json({ message: 'Form deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting form', error: error.message });
  }
};

// specific operations
export const getRandomQuizByDifficultyAndCategory = async (req, res) => {
  try {
    const { userId, difficultyId, categoryId, numberOfAnswers } = req.params;
    const quiz = await FormService.getRandomQuizByDifficultyAndCategory(userId, difficultyId, categoryId, numberOfAnswers);
    
    if (!quiz) {
      return res.status(201).json({ message: 'No available quizzes found for this user.' });
    }

    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving quiz', error: error.message });
  }
};
