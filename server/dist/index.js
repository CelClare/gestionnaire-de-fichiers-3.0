"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const csvRoutes_1 = __importDefault(require("./csvRoutes"));
const xmlRoutes_1 = __importDefault(require("./xmlRoutes"));
const excelRoutes_1 = __importDefault(require("./excelRoutes"));
const fileRoutes_1 = __importDefault(require("./fileRoutes"));
// Charger les variables d'environnement depuis le fichier .env
dotenv_1.default.config();
const app = (0, express_1.default)(); // Initialiser l'application Express
app.get('/', (req, res) => {
    // Code pour la page d'accueil ou de présentation
    res.send('Bienvenue sur l\'application de gestion de fichiers.'); // http://localhost:3000/
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
app.use(express_1.default.json()); // Middleware pour gérer le contenu JSON
app.use('/csv', csvRoutes_1.default);
app.use('/xml', xmlRoutes_1.default);
app.use('/excel', excelRoutes_1.default);
// Utiliser le routeur de fichiers
app.use('/files', fileRoutes_1.default);
//const port = 3000;
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
