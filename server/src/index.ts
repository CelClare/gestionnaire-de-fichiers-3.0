import express from 'express';
import dotenv from 'dotenv';
import csvRouter from './csvRoutes';
import xmlRouter from './xmlRoutes';
import excelRouter from './excelRoutes';
import fileRouter from './fileRoutes';

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

const app = express(); // Initialiser l'application Express

app.get('/', (req, res) => {
    // Code pour la page d'accueil ou de présentation
    res.send('Bienvenue sur l\'application de gestion de fichiers.'); // http://localhost:3000/
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
  });

app.use(express.json()); // Middleware pour gérer le contenu JSON

app.use('/csv', csvRouter);
app.use('/xml', xmlRouter);
app.use('/excel', excelRouter);

// Utiliser le routeur de fichiers
app.use('/files', fileRouter);

//const port = 3000;
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
