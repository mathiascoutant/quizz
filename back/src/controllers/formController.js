import Form from '../models/formModel.js';  
import Coin from '../models/coinModel.js'; 
import Category from '../models/categoryModel.js';
import Language from '../models/languageModel.js'; 


export const createForm = async (req, res) => {
    try {
      const { language, category, theme, difficulty, content, correctAnswer, possibleAnswers } = req.body;
      console.log(req.body);
      const coin = await Coin.findOne({ where: { difficulty } });
      const cat = await Category.findOne({ where: { category } });
      const lang = await Language.findOne({ where: { language } });
  
      if (!coin) {
        return res.status(400).json({ message: 'Invalid difficulty value' });
      }

      const newForm = await Form.create({
        languageId: lang.id,
        categoryId: cat.id ,
        theme,
        content,
        difficultyId: coin.id,  
        correctAnswer,
        possibleAnswers,
        numberOfAnswers: possibleAnswers.length
      });
  
      res.status(201).json(newForm);
    } catch (error) {
      res.status(500).json({ message: 'Error creating form', error: error.message });
    }
  };
  

export const getForms = async (req, res) => {
  try {
    const forms = await Form.findAll({
        include: [
            { model: Coin, as: 'difficulty' },  // L'alias correct pour Coin
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
      const { language, category, theme, difficulty, content, correctAnswer } = req.body;
      const form = await Form.findByPk(id);
      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }
  
      const coin = await Coin.findOne({ where: { difficulty } });
      const cat = await Category.findOne({ where: { category } });
      const lang = await Language.findOne({ where: { language } });

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
        correctAnswer
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
