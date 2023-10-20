import { Router } from 'express';
import fs from 'fs';
import axios from 'axios';
import { createObjectCsvWriter } from 'csv-writer';


const csvRouter = Router();

csvRouter.post('/create-csv/:name', async (req, res) => {
  const { name } = req.params;

  // Récupérer les données depuis l'API JSONPlaceholder
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const data = response.data;

    // Créer un fichier CSV avec les données
    const csvWriter = createObjectCsvWriter({
        path: `./csv/${name}.csv`, // Chemin du fichier CSV de destination
        header: [
          // Spécifiez ici les en-têtes du fichier CSV, en fonction de la structure de vos données
          { id: 'userId', title: 'User ID' },
          { id: 'id', title: 'ID' },
          { id: 'title', title: 'Title' },
          { id: 'body', title: 'Body' },
        ],
      });
    
      // Écrire les données dans le fichier CSV
    await csvWriter.writeRecords(data);
    
    res.send(`Le fichier ${name}.csv a été créé.`);
  } catch (error) {
    res.status(500).send('Une erreur est survenue lors de la création du fichier CSV.');
  }
});

// Autres routes pour lister, télécharger et supprimer des fichiers CSV
csvRouter.get('/list-csv', (req, res) => {
  // Récupérer la liste des fichiers CSV existants dans le répertoire
  fs.readdir('./csv', (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Une erreur est survenue lors de la récupération de la liste des fichiers CSV.');
    }
    res.json(files);
  });
});

csvRouter.get('/download-csv/:name', (req, res) => {
  const { name } = req.params;
  const filePath = `./csv/${name}.csv`;

  // Vérifier si le fichier existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('Le fichier demandé n\'existe pas.');
    }

    // Si le fichier existe, l'envoyer en réponse
    res.download(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Une erreur est survenue lors du téléchargement du fichier.');
      }
    });
  });
});

csvRouter.delete('/delete-csv/:name', (req, res) => {
  const { name } = req.params;
  const filePath = `./csv/${name}.csv`;

  // Vérifier si le fichier existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('Le fichier à supprimer n\'existe pas.');
    }

    // Si le fichier existe, le supprimer
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Une erreur est survenue lors de la suppression du fichier.');
      }
      res.send(`Le fichier ${name}.csv a été supprimé.`);
    });
  });
});



export default csvRouter;
