"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const exceljs_1 = __importDefault(require("exceljs"));
const excelRouter = (0, express_1.Router)();
excelRouter.post('/create-excel/:name', async (req, res) => {
    const { name } = req.params;
    // Récupérer les données depuis l'API JSONPlaceholder
    try {
        const response = await axios_1.default.get('https://jsonplaceholder.typicode.com/posts');
        const data = response.data; // Utilisez le type ou l'interface défini
        // Créer un fichier Excel avec les données
        const workbook = new exceljs_1.default.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1');
        // En-tête de la feuille Excel
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Titre', key: 'title', width: 30 },
            { header: 'Corps', key: 'body', width: 50 },
        ];
        // Ajouter les données à la feuille Excel.
        data.forEach((item) => {
            worksheet.addRow({ id: item.id, title: item.title, body: item.body });
        });
        // Enregistrer le fichier Excel dans le dossier de destination.
        await workbook.xlsx.writeFile(`./destination/${name}.xlsx`);
        res.send(`Le fichier ${name}.xlsx a été créé.`);
    }
    catch (error) {
        res.status(500).send('Une erreur est survenue lors de la création du fichier Excel.');
    }
});
// Autres routes pour lister, télécharger et supprimer des fichiers Excel
exports.default = excelRouter;
