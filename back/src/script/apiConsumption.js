import axios from 'axios';
import { Form } from '../models/formModel.js'; 
import Coin from '../models/coinModel.js';
import Category from '../models/categoryModel.js';
import Language from '../models/languageModel.js'; 

async function fetchAndCreateForm() {
    try {
        const choice = Math.random() < 0.5 ? 2 : 4;

        // Utilisation de la valeur de choice dans l'URL de l'API
        const response = await axios.get(`https://api.openquizzdb.org/?key=6R7AYV2HK4&langue=fr&choice=${choice}`);
      
      if (response.data.response_code !== 0) {
        throw new Error('Erreur de l\'API');
      }
  
      const quizData = response.data.results[0]; 

      if (!quizData) {
        throw new Error('Données de quiz non trouvées');
      }
  
      const coin = await Coin.findOne({ where: { difficulty: quizData.difficulte } });
      const cat = await Category.findOne({ where: { name: quizData.categorie } });
      const lang = await Language.findOne({ where: { code: quizData.langue } });
  
      if (!coin || !cat || !lang) {
        throw new Error(`erreur : ${quizData.difficulte} ou ${quizData.categorie} ou ${quizData.langue} n'existe pas`);
      }
  
      const existingForm = await Form.findOne({ where: { content: quizData.question } });
      if (existingForm) {
        console.log('La question existe déjà en base de données, aucun formulaire créé.');
        return;
      }
  
      const newForm = await Form.create({
        languageId: lang.id,
        categoryId: cat.id,
        theme: quizData.theme,
        difficultyId: coin.id,
        content: quizData.question,
        correctAnswer: quizData.reponse_correcte,
        possibleAnswers: quizData.autres_choix,
        numberOfAnswers: quizData.autres_choix.length
      });
  
      console.log('Form créé avec succès:', newForm);
  
    } catch (error) {
      console.error('Erreur lors de la création du form:', error.message);
    }
  }
  
  async function fetchAndCreateFormsInLoop(iterations) {
    for (let i = 0; i < iterations; i++) {
      console.log(`Itération ${i + 1}`);
      await fetchAndCreateForm();
    }
  }
  
  fetchAndCreateFormsInLoop(150);
  