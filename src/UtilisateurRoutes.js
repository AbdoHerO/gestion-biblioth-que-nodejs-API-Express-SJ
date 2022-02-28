/*importer express js pour manipuler les routes*/
const express = require('express');
/*importer le module Router de express js*/
const routerUtilisateurs = express.Router();
/*imporer UtilisateurRoutes*/
const UtilisateurRoutes =   require('../controllers/UtilisateurRoutes');

/*la route:=> Utilisateurs/ajouter ,avec la méthode Get 
  AjouterForm :=>la fonction à exécuté qui permet d'afficher la vue views/Utilisateur/ajouter.ejs*/
routerUtilisateurs.get('/ajouter', UtilisateurRoutes.AjouterForm);

/*la route:=> Utilisateurs/ajouter ,avec la méthode POST
ajouterValider:=>la fonction du UtilisateurRoutes qui permet d'insérer un Utilisateur dans la table Utilisateur*/
routerUtilisateurs.post('/ajouter', UtilisateurRoutes.ajouterValider);
/*
On va mapper les autres fonctions:
detail
supprimer
modifier
liste
...
*/

/*Afficher la liste des Utilisateurs */
routerUtilisateurs.get('/', UtilisateurRoutes.afficherListe);
/*Detail   un Utilisateur dont l'id est passé en paramètre*/
routerUtilisateurs.get('/details/:id', UtilisateurRoutes.details);


/* afficher le formulaire pour modifier un Utilisateur */
routerUtilisateurs.get('/modifier/:id', UtilisateurRoutes.modifier);


/*Valider la modification d'un Utilisateur */
routerUtilisateurs.post('/modifier/:id', UtilisateurRoutes.modifierValidation);

/*Supprimer un Utilisateur*/
routerUtilisateurs.get('/supprimer/:id', UtilisateurRoutes.supprimer);

module.exports = routerUtilisateurs