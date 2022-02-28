/*importer le fichier de configuration de connexion à la base de données*/
var dbConn = require('./../../config/db');
/*Créer un objet de type Produit*/
var Utilisateur = function(utilisateur){
  this.id     = Utilisateur.id;
  this.nom     = Utilisateur.nom;
  this.email     = Utilisateur.email;
  this.password     = Utilisateur.password;
  this.photo     = Utilisateur.photo;

};
/*Ajouter à l'objet Produit la fonction insert qui permet d'ajouter un produit dans la table produits*/
Utilisateur.insert = function (utilisateur, result) {
/*produit :sera renseigner par le controlleur contenant l'objet à insérer dans la table produit
result:un objet qui contiendra la réponse à envoyer au controlleur :ProduitController
*/

/*Exécuter la requêtes SQL insert into produits*/
dbConn.query("INSERT INTO utilisateurs set ?", utilisateur, function (err, res) {
/*
function (err, res):la méthode de callback sera exécuté aprés l'exécution de la commande insert into
err:contient l'erreur sql reçu
res:contient la reponse de la methode query 
*/

/*Si la fonction query délenche une erreur*/
if(err) {

  console.log("error: ", err);
  result(err, null);
}
/*Si la fonction query s'exécute sans erreur on envoie res.insertId :c'est la valeur de la primary key de l'objet inséré */
else{
  console.log(res.insertId);
  result(null, res.insertId);
}
});
};

//vérifier si un attribut est vide 
Utilisateur.verifier=function(utilisateur)
{
    if(utilisateur.nom=='' || utilisateur.email=='' || utilisateur.password==0 || utilisateur.photo==0)
    return true;
};

/* on va ajouter les autre fonctions par la suite 
....
*/

//Afficher la liste des produits
Utilisateur.findAll = function (result) {
  dbConn.query("Select * from utilisateurs", function (err, res) {
  if(err) {
  /* envoie un objet error */
  result(null, err);
  }
  else{
  /*en res :un tableau d'objet produit*/
  result(null, res);
  }
  });
  };



 /*Détail d'un produit */
 Utilisateur.findById = function (id, result) {
  dbConn.query("Select * from utilisateurs where id = ? ", id, function (err, res) {
  if(err) {
    result(err, null);
  }
  else{
    result(null, res);
  }
  });
  };

/*Supprimer un produit par son id*/
Utilisateur.delete = function(id, result){
  dbConn.query("DELETE FROM utilisateurs WHERE id = ?", [id], function (err, res) {
  if(err) {
  result(null, err);
  }
  else{
  result(null, res);
  }
  });
  };

  /*Modifier un produit dont id est passé en paramètre*/
  Utilisateur.update = function(id, utilisateur, result){
  dbConn.query("UPDATE utilisateurs SET nom=?,email=?,password=?,photo=? WHERE id = ?", [utilisateur.nom,utilisateur.email,utilisateur.password,utilisateur.photo, id], function (err, res) {
  if(err) {
  result(null, err);
  }else{
  result(null, res);
  }
  });
  };



/*Exporter la classe pour pouvoir l'importer dans le controller */
module.exports= Utilisateur;