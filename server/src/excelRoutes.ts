import { Router } from 'express';
import fs from 'fs';
import axios from 'axios';
import exceljs from 'exceljs';

// Définir un type ou une interface pour les données de l'API
interface PostData {
    id: number;
    title: string;
    body: string;
  }

const excelRouter = Router();

excelRouter.post('/create-excel/:name', async (req, res) => {
  const { name } = req.params;

  // Récupérer les données depuis l'API JSONPlaceholder
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const data: PostData[] = response.data; // Utilisez le type ou l'interface défini

    // Créer un fichier Excel avec les données
    const workbook = new exceljs.Workbook();
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
  } catch (error) {
    res.status(500).send('Une erreur est survenue lors de la création du fichier Excel.');
  }
});

// Autres routes pour lister, télécharger et supprimer des fichiers Excel

export default excelRouter;
