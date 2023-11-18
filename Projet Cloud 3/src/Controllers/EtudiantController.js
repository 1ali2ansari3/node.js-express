const express = require('express');
const router = express.Router();
const authPage = require("../middlewares/middlewares");
const db = require('../db/db'); 


router.get("/home1", authPage('etudiant'), (req, res) => {
    res.json("Page Etudiant");
});



router.get('/filiere-stats',authPage('etudiant'), async (req, res) => {
  try {
    const collection = db.collection('filieres'); 

    const filieres = await collection.aggregate([
      {
        $group: {
          _id: '$name',
          nombre: { $sum: '$nombre' }
        }
      }
    ]).toArray();

    res.json(filieres);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des données');
  }
});

router.post('/inscriptions',authPage('etudiant'), async (req, res) => {
    try {
      const { id_etudiant, id_filiere } = req.body;
  
      const collection = db.collection('inscription');
  
      const nouvelleInscription = {
        idetudiant: id_etudiant, 
        idfiliere: id_filiere,
        status: '0',
      };
  
      const result = await collection.insertOne(nouvelleInscription);
  
      res.status(201).json();
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la création de l\'inscription');
    }
  });
  

  router.get('/inscriptions/:id_etudiant',authPage('etudiant'), async (req, res) => {
    try {
      const id_etudiant = req.params.id_etudiant;
  
      const collection = db.collection('inscription');
  
      const inscriptions = await collection.find({ idetudiant: id_etudiant }).toArray();
  
      res.status(200).json(inscriptions);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la récupération des inscriptions par ID étudiant');
    }
  });

  router.put('/inscriptions/:id_etudiant', authPage('etudiant'), async (req, res) => {
    try {
      const id_etudiant = req.params.id_etudiant;
      const nouvelleFiliere = req.body.idfiliere;
  
      const collection = db.collection('inscription');
  
      const inscription = await collection.findOne({ idetudiant: id_etudiant });
  
      if (!inscription) {
        return res.status(404).json({ message: 'Inscription non trouvée pour cet ID étudiant' });
      }
  
      if (inscription.status === 0) {
        inscription.idfiliere = nouvelleFiliere;
  
        const result = await collection.updateOne({ idetudiant: id_etudiant }, { $set: inscription });
  
        res.status(200).json({ message: 'Filière mise à jour avec succès' });
      } else {
        res.status(400).json({ message: 'La modification de la filière n\'est pas autorisée pour cette inscription' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la mise à jour de la filière de l\'inscription');
    }
  });
  
  



module.exports = router;
