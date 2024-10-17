import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
  return await bcrypt.hash(password);
};

export const comparePassword = async (password, hashedPassword) => {
  console.log('Mot de passe fourni:', password);
  console.log('Mot de passe haché stocké:', hashedPassword);
  try {
    const hashedInputPassword = await bcrypt.hash(password);
    console.log('Mot de passe fourni haché:', hashedInputPassword);
    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log('Résultat de la comparaison:', isMatch ? 'Correspondance' : 'Pas de correspondance');
    return isMatch;
  } catch (error) {
    console.error('Erreur lors de la comparaison des mots de passe:', error);
    return false;
  }
};

export { hashPassword };
