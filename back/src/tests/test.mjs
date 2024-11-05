import supertest from 'supertest';
import express from 'express';
import { register, login } from '../controllers/authController'; // Assurez-vous que le chemin est correct
import { getCategories } from '../controllers/categoryController'; // Assurez-vous que le chemin est correct
import { getLevels } from '../controllers/listDifficultyController'; // Assurez-vous que le chemin est correct
import { getForms } from '../controllers/formController'; // Assurez-vous que le chemin est correct
import { getUserById, getUserProfile } from '../controllers/userController'; // Assurez-vous que le chemin est correct

const app = express();
app.use(express.json());
app.post('/auth/register', register); // Route pour l'inscription
app.post('/auth/login', login); // Route pour la connexion
app.get('/api/categories', getCategories); // Route pour récupérer les catégories
app.get('/api/levels', getLevels); // Route pour récupérer les niveaux de difficulté
app.get('/api/quizz', getForms); // Route pour récupérer toutes les questions
app.get('/profile', getUserProfile); // Route pour récupérer le profil

describe('Tests pour l\'inscription et la connexion', () => {
    
    test('Devrait inscrire un nouvel utilisateur', async () => {
        const newUser = {
            firstname: 'mma',
            lastname: 'mma',
            pseudo: 'mmaaa',
            email: 'jmmaaa@example.com',
            password: 'passssword123'
        };

        const response = await supertest(app).post('/auth/register').send(newUser);
        
        expect(response.status).toBe(201); // Vérifiez que l'inscription a réussi
        expect(response.body).toHaveProperty('message', 'Utilisateur enregistré avec succès');
    });

    test('Devrait connecter un utilisateur existant', async () => {
        const userCredentials = {
            email: 'jmmaa@example.com', // Assurez-vous que cet utilisateur existe
            password: 'passssword123' // Assurez-vous que le mot de passe est correct
        };

        const response = await supertest(app).post('/auth/login').send(userCredentials);
        
        expect(response.status).toBe(200); // Vérifiez que la connexion a réussi
        expect(response.body).toHaveProperty('token'); // Vérifiez que le token est renvoyé
    });

    test('Devrait récupérer les catégories', async () => {
        const response = await supertest(app).get('/api/categories');
        
        expect(response.status).toBe(200); // Vérifiez que la récupération a réussi
        expect(response.body).toBeInstanceOf(Array); // Vérifiez que la réponse est un tableau
        expect(response.body.length).toBeGreaterThan(0); // Vérifiez qu'il y a au moins une catégorie
    });

    test('Devrait récupérer les niveaux de difficulté', async () => {
        const response = await supertest(app).get('/api/levels');
        
        expect(response.status).toBe(200); // Vérifiez que la récupération a réussi
        expect(response.body).toBeInstanceOf(Array); // Vérifiez que la réponse est un tableau
        expect(response.body.length).toBeGreaterThan(0); // Vérifiez qu'il y a au moins un niveau de difficulté
    });

    test('Devrait récupérer toutes les questions', async () => {
        const response = await supertest(app).get('/api/quizz');
        
        expect(response.status).toBe(200); // Vérifiez que la récupération a réussi
        expect(response.body).toBeInstanceOf(Array); // Vérifiez que la réponse est un tableau
        expect(response.body.length).toBeGreaterThan(0); // Vérifiez qu'il y a au moins une question
    });

    test('Devrait récupérer le profil', async () => {
        // Pour ce test, vous devez d'abord vous connecter pour obtenir un token
        const userCredentials = {
            email: 'jmmaa@example.com', // Assurez-vous que cet utilisateur existe
            password: 'passssword123' // Assurez-vous que le mot de passe est correct
        };

        const loginResponse = await supertest(app).post('/auth/login').send(userCredentials);
        const token = loginResponse.body.token; // Récupérez le token

        const response = await supertest(app)
            .get('/profile')
            .send({ token }); // Envoyez le token dans le corps de la requête

        expect(response.status).toBe(200); // Vérifiez que la récupération a réussi
        expect(response.body).toHaveProperty('email', 'jmmaa@example.com'); // Vérifiez que l'email est correct
        expect(response.body).toHaveProperty('firstname'); // Vérifiez que le prénom est présent
        expect(response.body).toHaveProperty('lastname'); // Vérifiez que le nom est présent
    });
});