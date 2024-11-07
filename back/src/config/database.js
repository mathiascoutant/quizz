import { Sequelize } from 'sequelize';
// Configuration de la connexion à la base de données AWS
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: "quizzgo-database.cni0qu0uu793.eu-north-1.rds.amazonaws.com",
  port: 3306, // Port par défaut pour MySQL, ajustez si nécessaire
  username: "admin",
  password: "quizzGo33$",
  database: "quizz",
  logging: console.log, // Activez temporairement les logs pour le débogage
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Fonction pour tester la connexion
const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie');
    return true;
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    return false;
  }
};

// Fonction pour vérifier périodiquement la connexion
const checkDatabaseConnection = async () => {
  const isConnected = await connectDatabase();
  if (isConnected) {
    console.log('La connexion à la base de données est fonctionnelle');
  } else {
    console.error('La connexion à la base de données a échoué');
    // Vous pouvez ajouter ici une logique pour tenter de se reconnecter ou notifier les administrateurs
  }
};

// Vérifier la connexion toutes les 5 minutes
setInterval(checkDatabaseConnection, 5 * 60 * 1000);

// Vérifier la connexion au démarrage
checkDatabaseConnection();

export { sequelize, connectDatabase, checkDatabaseConnection };
