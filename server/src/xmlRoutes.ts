import { Router } from 'express';
import fs from 'fs';
import axios from 'axios';
import xmlbuilder from 'xmlbuilder';

// Définir le type pour les données de l'API
interface PostData {
    userId: number;
    id: number;
    title: string;
    body: string;
  }

const xmlRouter = Router();

xmlRouter.post('/create-xml/:name', async (req, res) => {
  const { name } = req.params;

  // Récupérer les données depuis l'API JSONPlaceholder
  try {
    const response = await axios.get<PostData[]>('https://jsonplaceholder.typicode.com/posts');
    const data = response.data;

    // Créer un fichier XML avec les données
    const xml = xmlbuilder.create('data');

    // Ajouter des nœuds XML.
    data.forEach((item) => {
        xml.ele('item') // Crée un élément "item"
          .ele('userId', item.userId) // Ajoute un élément "userId"
          .up() // Remonte au parent
          .ele('id', item.id) // Ajoute un élément "id"
          .up() // Remonte au parent
          .ele('title', item.title) // Ajoute un élément "title"
          .up() // Remonte au parent
          .ele('body', item.body); // Ajoute un élément "body"
      });

    // Enregistrer le fichier XML.
    const xmlString = xml.end({ pretty: true }); // Convertir l'objet XML en une chaîne XML lisible
    fs.writeFileSync(`./xml/${name}.xml`, xmlString, 'utf8');

    res.send(`Le fichier ${name}.xml a été créé.`);
  } catch (error) {
    res.status(500).send('Une erreur est survenue lors de la création du fichier XML.');
  }
});

// Autres routes pour lister, télécharger et supprimer des fichiers XML

export default xmlRouter;
