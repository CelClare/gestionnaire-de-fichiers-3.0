import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const fileRouter = Router();

// Route pour lister tous les fichiers
fileRouter.get('/list-files', (req, res) => {
  const directoryPath = path.join(__dirname, '../files'); 
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send('Erreur lors de la lecture des fichiers.');
    }
    const fileNames = files.map((file) => file);
    res.json(fileNames);
  });
});

// Route pour télécharger un fichier spécifique
fileRouter.get('/download-file/:filename', (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, '../files', fileName); 
  res.download(filePath, fileName, (err) => {
    if (err) {
      return res.status(500).send('Erreur lors du téléchargement du fichier.');
    }
  });
});

// Route pour supprimer un fichier spécifique
fileRouter.delete('/delete-file/:filename', (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, '../files', fileName); 
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).send('Erreur lors de la suppression du fichier.');
    }
    res.send('Fichier supprimé avec succès.');
  });
});

// Ajouter une route pour créer des fichiers vides
fileRouter.post('/create-empty-file/:filename', (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, '../files', fileName); 

  // Vérifier si le fichier existe déjà
  if (fs.existsSync(filePath)) {
    return res.status(400).send('Le fichier existe déjà.');
  }

  // Créer le fichier vide
  fs.writeFileSync(filePath, '');

  res.send(`Le fichier ${fileName} a été créé.`);
});

export default fileRouter;
