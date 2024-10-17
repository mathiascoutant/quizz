import jwt from 'jsonwebtoken';


const JWT_SECRET = "c54bb676c70ec4708074f3e81adc224c87ce60c7ebd9954c0626045f61b6d7c7b9dd67cdcfa9b74314806c9288caef228ccb0ca0a8465733d0cef3afc78d82d2";

const generateToken = (payload) => {
  console.log('JWT_SECRET est défini:', !!JWT_SECRET);
  console.log('Longueur de JWT_SECRET:', JWT_SECRET.length);
  
  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn: '1d',  // Le token expire après 1 jour
    algorithm: 'HS256'
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error.message);
    return null; // ou throw error; selon votre logique d'application
  }
};

export { JWT_SECRET, generateToken, verifyToken };

// module.exports = { generateToken, verifyToken };
