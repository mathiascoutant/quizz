import Form from '../models/formModel.js';  
import Coin from '../models/coinModel.js'; 
import Category from '../models/categoryModel.js';
import Language from '../models/languageModel.js'; 
import UserAnswer from '../models/userAnswerModel.js';


// ------------------------
// Basic CRUD Operations for Forms
// ------------------------
export const createForm = async (req, res) => {
  try {
    const { language, category, theme, difficulty, content, correctAnswer, possibleAnswers } = req.body;
    const coin = await Coin.findOne({ where: { difficulty } });
    if (!coin) {
      return res.status(400).json({ message: 'Valeur de difficulté invalide.' });
    }

   
    const cat = await Category.findOne({ where: { name: category } });
    if (!cat) {
      return res.status(400).json({ message: 'Catégorie invalide.' });
    }

 
    const lang = await Language.findOne({ where: { name: language } });
    console.log('lang', lang);
    if (!lang) {
      return res.status(400).json({ message: 'Langue invalide.' });
    }

    // Création du formulaire
    const newForm = await Form.create({
      languageId: lang.id,
      categoryId: cat.id,
      theme,
      content,
      difficultyId: coin.id,
      correctAnswer,
      possibleAnswers,
      numberOfAnswers: possibleAnswers.length
    });

    res.status(201).json(newForm);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du formulaire.', error: error.message });
  }
};
  

export const getForms = async (req, res) => {
  try {
    const forms = await Form.findAll({
        include: [
            { model: Coin, as: 'difficulty' },  
            { model: Category, as: 'category' },
            { model: Language, as: 'language' }
        ]
    });
    
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving forms', error: error.message });
  }
};


export const getFormById = async (req, res) => {
  try {
    const { id } = req.params;

    const form = await Form.findByPk(id, {
      include: [
        { model: Coin, as: 'difficulty' },
        { model: Category, as: 'category' },
        { model: Language, as: 'language' }
      ]  
    });

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
      const { id } = req.params;
      const { language, category, theme, difficulty, content, possibleAnswers, correctAnswer } = req.body; 
      const form = await Form.findByPk(id);
      if (!form) {
          return res.status(404).json({ message: 'Form not found' });
      }

      const coin = await Coin.findOne({ where: { difficulty } });
      console.log('coin', coin);
      const cat = await Category.findOne({ where: { name: category } });
      if (!cat) {
          return res.status(400).json({ message: 'Invalid Category.' });
      }

      const lang = await Language.findOne({ where: { name: language } });
      console.log('lang', lang);
      if (!lang) {
          return res.status(400).json({ message: 'Ivalid Language' });
      }

      if (!coin) {
          return res.status(400).json({ message: 'Invalid difficulty value' });
      }
      
      const difficultyId = coin.id;
      const categoryId = cat.id;
      const languageId = lang.id;
      await form.update({
          languageId,
          categoryId,
          theme,
          difficultyId,  
          content,
          correctAnswer,
          possibleAnswers,
          numberOfAnswers: possibleAnswers.length
      });

      res.status(200).json(form);
  } catch (error) {
      res.status(500).json({ message: 'Error updating form', error: error.message });
  }
};

  
export const deleteForm = async (req, res) => {
  try {
    const { id } = req.params;

    const form = await Form.findByPk(id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    await form.destroy();  

    res.status(200).json({ message: 'Form deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting form', error: error.message });
  }
};

// -----------------------------
// Specific Operations for Forms
// -----------------------------

export const getRandomQuizByDifficultyAndCategory = async (req, res) => {
  try {
    const { userId, difficultyId, categoryId } = req.params; // Récupérer les paramètres
    const quizzes = await Form.findAll({
      where: {
        difficultyId: difficultyId,
        categoryId: categoryId
      },
      include: [
        { model: Coin, as: 'difficulty' },
        { model: Category, as: 'category' },
        { model: Language, as: 'language' }
      ]
    });

    const answeredQuizzes = await UserAnswer.findAll({
      where: { userId },
      attributes: ['formId'] 
    });

    const answeredQuizIds = answeredQuizzes.map(answer => answer.formId); 

    // Exxclude answered quizzes
    const availableQuizzes = quizzes.filter(quiz => !answeredQuizIds.includes(quiz.id));

    // select a random quizz if available
    if (availableQuizzes.length === 0) {
      return res.status(404).json({ message: 'No available quizzes found for this user.' });
    }

    const randomQuiz = availableQuizzes[Math.floor(Math.random() * availableQuizzes.length)];

    res.status(200).json(randomQuiz);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving quiz', error: error.message });
  }
};