import supertest from 'supertest';
import express from 'express';
import { register, login } from '../controllers/authController';
import { getCategories } from '../controllers/categoryController';
import { getLevels } from '../controllers/coinController.js';
import { getForms } from '../controllers/formController';
import { getUserProfile } from '../controllers/userController';
import { getTopUsersWithPosition } from '../controllers/userController.js';
import { protect } from '../controllers/authController';
import { getUserCouponsByUserId } from '../controllers/userCouponController.js';
import { getAllCoupons } from '../controllers/couponController.js';
const app = express();
app.use(express.json());
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);
app.get('/api/categories', getCategories);
app.get('/api/levels', getLevels);
app.get('/api/quizz', getForms);
app.get('/api/profile', getUserProfile);
app.get('/api/classement/top-users', protect, getTopUsersWithPosition);
app.get('/api/user-coupons/:userId', getUserCouponsByUserId);
app.get('/api/coupons', getAllCoupons);

describe('Tests pour l\'inscription et la connexion', () => {
    const userCredentials = {
        email: 'hehe5@example.com',
        pseudo: 'hehe5'
    };

    test('Devrait inscrire un nouvel utilisateur', async () => {
        const newUser = {
            firstname: 'mma',
            lastname: 'mma',
            pseudo: userCredentials.pseudo,
            email: userCredentials.email,
            password: 'passssword123'
        };

        const response = await supertest(app).post('/api/auth/register').send(newUser);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Utilisateur enregistré avec succès');
    });

    test('Devrait connecter un utilisateur existant', async () => {
        const userLoginCredentials = {
            email: userCredentials.email,
            password: 'passssword123'
        };

        const response = await supertest(app).post('/api/auth/login').send(userLoginCredentials);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    test('Devrait récupérer les catégories', async () => {
        const response = await supertest(app).get('/api/categories');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('Devrait récupérer les niveaux de difficulté', async () => {
        const response = await supertest(app).get('/api/levels');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('Devrait récupérer toutes les questions', async () => {
        const response = await supertest(app).get('/api/quizz');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('Devrait récupérer le profil', async () => {
        const userLoginCredentials = {
            email: userCredentials.email,
            password: 'passssword123'
        };

        const loginResponse = await supertest(app).post('/api/auth/login').send(userLoginCredentials);
        const token = loginResponse.body.token;

        const response = await supertest(app)
            .get('/api/profile')
            .set('Authorization', `Bearer ${token}`);

        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toHaveProperty('email', userCredentials.email);
        expect(response.body.user).toHaveProperty('badges');
        expect(response.body.user.badges).toBeInstanceOf(Array);
    });
});

describe('Tests pour le classement des utilisateurs', () => {
    test('Devrait récupérer les 3 meilleurs utilisateurs et la position de l\'utilisateur courant', async () => {
        const userLoginCredentials = {
            email: 'hehe4@example.com',
            password: 'passssword123'
        };

        const loginResponse = await supertest(app).post('/api/auth/login').send(userLoginCredentials);
        const token = loginResponse.body.token;

        const response = await supertest(app)
            .get('/api/classement/top-users')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('topUsers');
        expect(response.body.topUsers).toBeInstanceOf(Array);
        expect(response.body.topUsers.length).toBe(10);

        response.body.topUsers.forEach(user => {
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('pseudo');
            expect(user).toHaveProperty('coins');
        });

        expect(response.body).toHaveProperty('currentUser');
        expect(response.body.currentUser).toHaveProperty('id');
        expect(response.body.currentUser).toHaveProperty('pseudo');
        expect(response.body.currentUser).toHaveProperty('coins');
        expect(response.body.currentUser).toHaveProperty('position');
    });
});

describe('Tests pour la récupération des coupons de l\'utilisateur', () => {
    test('Devrait récupérer les coupons de l\'utilisateur', async () => {
        const userId = 41;
        const userLoginCredentials = {
            email: 'hehe4@example.com',
            password: 'passssword123'
        };

        const loginResponse = await supertest(app).post('/api/auth/login').send(userLoginCredentials);
        const token = loginResponse.body.token;

        const response = await supertest(app)
            .get(`/api/user-coupons/${userId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);

        response.body.forEach(coupon => {
            expect(coupon).toHaveProperty('id');
            expect(coupon).toHaveProperty('userId', userId);
            expect(coupon).toHaveProperty('couponId');
            expect(coupon).toHaveProperty('discountCode');
            expect(coupon).toHaveProperty('coupon');
        });
    });
});

describe('Tests pour la récupération de tous les coupons', () => {
    test('Devrait récupérer tous les coupons', async () => {
        const userLoginCredentials = {
            email: 'hehe4@example.com',
            password: 'passssword123'
        };

        const loginResponse = await supertest(app).post('/api/auth/login').send(userLoginCredentials);
        const token = loginResponse.body.token;

        const response = await supertest(app)
            .get('/api/coupons')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);

        response.body.forEach(coupon => {
            expect(coupon).toHaveProperty('id');
            expect(coupon).toHaveProperty('cashReduction');
            expect(coupon).toHaveProperty('percentReduction');
            expect(coupon).toHaveProperty('nameNominator');
            expect(coupon).toHaveProperty('brand');
            expect(coupon).toHaveProperty('specificContent');
            expect(coupon).toHaveProperty('coinCost');
            expect(coupon).toHaveProperty('validityDate');
            expect(coupon).toHaveProperty('color');
        });
    });
});