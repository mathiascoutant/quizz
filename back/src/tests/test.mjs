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
import jwt from 'jsonwebtoken';
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

describe('Tests', () => {
    const userCredentials = {
        email: 'hehe11@example.com',
        pseudo: 'hehe11',
        password: 'passssword123'
    };

    test('Devrait inscrire un nouvel utilisateur', async () => {
        const newUser = {
            firstname: 'mma',
            lastname: 'mma',
            pseudo: userCredentials.pseudo,
            email: userCredentials.email,
            password: userCredentials.password
        };

        const response = await supertest(app).post('/api/auth/register').send(newUser);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Utilisateur enregistré avec succès');
    });

    test('Devrait connecter un utilisateur existant', async () => {
        const userLoginCredentials = {
            email: userCredentials.email,
            password: userCredentials.password
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
            password: userCredentials.password
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

    test('Devrait récupérer les 10 meilleurs utilisateurs et la position de l\'utilisateur courant', async () => {
        const userLoginCredentials = {
            email: userCredentials.email,
            password: userCredentials.password
        };

        const loginResponse = await supertest(app).post('/api/auth/login').send(userLoginCredentials);
        const token = loginResponse.body.token;

        const response = await supertest(app)
            .get('/api/classement/top-users')
            .set('Authorization', `Bearer ${token}`);

        console.log('Réponse des meilleurs utilisateurs:', response.body);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('topUsers');
        expect(response.body.topUsers).toBeInstanceOf(Array);
        expect(response.body.topUsers.length).toBe(10);

        const currentUser = response.body.currentUser;
        expect(currentUser).toHaveProperty('id');
        expect(currentUser).toHaveProperty('pseudo');
        expect(currentUser).toHaveProperty('coins');
        expect(currentUser).toHaveProperty('position');

        const isCurrentUserInTopUsers = response.body.topUsers.some(user => user.id === currentUser.id);
        expect(isCurrentUserInTopUsers).toBe(false);

        response.body.topUsers.forEach(user => {
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('pseudo');
            expect(user).toHaveProperty('coins');
        });
    });

    test('Devrait récupérer les coupons de l\'utilisateur', async () => {
        const userLoginCredentials = {
            email: userCredentials.email,
            password: userCredentials.password
        };

        const loginResponse = await supertest(app).post('/api/auth/login').send(userLoginCredentials);
        const token = loginResponse.body.token;

        // Assurez-vous que l'utilisateur a des coupons dans la base de données
        const response = await supertest(app)
            .get('/api/user-coupons/41') // Utilisez l'ID de l'utilisateur qui a des coupons
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);

        response.body.forEach(coupon => {
            expect(coupon).toHaveProperty('id');
            expect(coupon).toHaveProperty('userId', 41); // Vérifiez que l'ID de l'utilisateur est correct
            expect(coupon).toHaveProperty('couponId');
            expect(coupon).toHaveProperty('discountCode');
            expect(coupon).toHaveProperty('quantity');
            expect(coupon).toHaveProperty('coupon');
            expect(coupon.coupon).toHaveProperty('id');
            expect(coupon.coupon).toHaveProperty('cashReduction');
            expect(coupon.coupon).toHaveProperty('percentReduction');
            expect(coupon.coupon).toHaveProperty('nameNominator');
            expect(coupon.coupon).toHaveProperty('brand');
            expect(coupon.coupon).toHaveProperty('specificContent');
            expect(coupon.coupon).toHaveProperty('coinCost');
            expect(coupon.coupon).toHaveProperty('validityDate');
            expect(coupon.coupon).toHaveProperty('color');
        });
    });

    test('Devrait récupérer tous les coupons', async () => {
        const userLoginCredentials = {
            email: userCredentials.email,
            password: userCredentials.password
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