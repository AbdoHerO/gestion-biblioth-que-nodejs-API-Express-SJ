var mysql = require('mysql2');
var connection = mysql.createConnection({
  host: "localhost", /*le serveur de la base de données*/
  port:"3306",/*le port du service mysql*/
  user: "root", /*Utilisateur de la base de données*/
  password: "",/*le mot de passe de l'utilisateur de la base de données*/
  database: "gestion_bibliotheque_nodejs" /*le nom de la base de données à Créer manullement*/
});
//connexion à la base de données
connection.connect(function(error){
    if(!!error) {
        console.log(error);
    } else {
        console.log('Connected..!');
    }
});

module.exports = connection;