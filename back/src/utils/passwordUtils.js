import crypto from 'crypto';

const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

export const comparePassword = (password, hashedPassword) => {
  console.log('Mot de passe fourni:', password);
  console.log('Mot de passe haché stocké:', hashedPassword);
  try {
    if (!password || !hashedPassword) {
      throw new Error('Le mot de passe ou le hash est manquant');
    }
    const hashedInputPassword = hashPassword(password);
    const isMatch = hashedInputPassword === hashedPassword;
    console.log(isMatch);
    return isMatch;
  } catch (error) {
    console.error('Erreur lors de la comparaison des mots de passe:', error);
    return false;
  }
};

export { hashPassword };
