const express = require('express');
const router = express.Router();
const authPage = require("../middlewares/middlewares");
const db = require('../db/db'); 

router.get("/home2", authPage('umi'), (req, res) => {
    res.json("Page Etudiant");
});


router.post('/valider-inscription/:id_etudiant', async (req, res) => {
    try {
      const id_etudiant = req.params.id_etudiant;
  
      
      const collectionInscription = db.collection('inscription');
      const inscription = await collectionInscription.findOne({ idetudiant: id_etudiant });
  
      if (!inscription) {
        return res.status(404).json({ message: 'Inscription non trouvée pour cet ID étudiant' });
      }
  
      inscription.status = 1;
  
      await collectionInscription.updateOne({ idetudiant: id_etudiant }, { $set: inscription });
  
      
      const collectionUsers = db.collection('users');
      const user = await collectionUsers.findOne({ _id: id_etudiant });
  
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé pour cet ID étudiant' });
      }
  
      user.status = 1;
  
      await collectionUsers.updateOne({ _id: id_etudiant }, { $set: user });
  
      res.status(200).json({ message: 'Inscription validée avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la validation de l\'inscription');
    }


    router.get('/inscriptions-validees', async (req, res) => {
        try {
          const collectionInscription = db.collection('inscription');
      
          const inscriptionsValidees = await collectionInscription.find({ status: 1 }).toArray();
      
          res.status(200).json(inscriptionsValidees);
        } catch (error) {
          console.error(error);
          res.status(500).send('Erreur lors de la récupération des inscriptions validées');
        }
      });


      router.get('/inscriptions-non-validees', async (req, res) => {
        try {
          const collectionInscription = db.collection('inscription');
      
          const inscriptionsNonValidees = await collectionInscription.find({ status: { $ne: 1 } }).toArray();
      
          res.status(200).json(inscriptionsNonValidees);
        } catch (error) {
          console.error(error);
          res.status(500).send('Erreur lors de la récupération des inscriptions non validées');
        }
      });

      router.delete('/inscriptions/:id_etudiant', async (req, res) => {
        
        try {
          const id_etudiant = req.params.id_etudiant;
      
          const collectionInscription = db.collection('inscription');
      
          const inscription = await collectionInscription.findOne({ idetudiant: id_etudiant });
      
          if (!inscription) {
            return res.status(404).json({ message: 'Inscription non trouvée pour cet ID étudiant' });
          }
      
          await collectionInscription.deleteOne({ idetudiant: id_etudiant });
      
          res.status(200).json({ message: 'Inscription supprimée avec succès' });
        } catch (error) {
          console.error(error);
          res.status(500).send('Erreur lors de la suppression de l\'inscription');
        }
      });
      

  });
  
