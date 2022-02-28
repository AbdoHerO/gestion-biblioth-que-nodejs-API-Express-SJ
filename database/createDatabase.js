/*Importer le module mysql qui permet de gérer les transaction dans une base de données mysql */

var mysql = require('mysql2');
var con = mysql.createConnection({
host: "localhost",
user: "root",
password: ""
});

con.connect(function(err) {
if (err) throw err;
console.log("Connected!");
con.query("CREATE DATABASE gestion_bibliotheque_nodejs", function (err, result) {
if (err) throw err;
console.log("Database created");


//créer une connexion à la base de données
var con = mysql.createConnection({
    host: "localhost", /*le serveur de la base de données*/
    user: "root", /*Utilisateur de la base de données*/
    password: "",/*le mot de passe de l'utilisateur de la base de données*/
    port: "3306", /*le serveur de la base de données*/
    database: "gestion_bibliotheque_nodejs" /*le nom de la base de données à Créer manullement*/
    });
    
    //se connecter en utilisant la connexion con crée
    con.connect(function(err) {
    /*err:contient error de connexion*/
    /*afficher erreur de connexion s'il existe*/
    if (err) throw err;
    /*pas d'erreur donc on peut exécuter des requête sql */

    var sql = "CREATE TABLE users (id int primary key auto_increment,full_name varchar(25),email varchar(50) ,password varchar(50) ,active BOOLEAN, role varchar(10),photo varchar(50))";
    /*Exécuter la requete sql crée*/
    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table users crée");
    });
    
    
    var sql = "CREATE TABLE categories (id int primary key auto_increment,libelle varchar(25))";
    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("table categories est crée");
    });


    var sql = "CREATE TABLE books (id int primary key auto_increment,title varchar(25),description varchar(250) ,id_categorie int ,image varchar(50),constraint foreign key (id_categorie) references categories(id) on delete cascade)";
    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("table books est crée");
    });



    var sql = "CREATE TABLE reservations (id int primary key auto_increment,id_book int ,id_user int ,dataPrise date ,dateRemise date,constraint foreign key (id_user) references users(id) on delete cascade,constraint foreign key (id_book) references books(id) on delete cascade)"
    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("table reservations est crée");
    });
    });


});
});


