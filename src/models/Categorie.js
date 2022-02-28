/*importer le fichier de configuration de connexion à la base de données*/
var dbConn = require("./../../config/db");
var Categorie = function (categorie) {
  this.id = categorie.id;
  this.libelle = categorie.libelle;
};

Categorie.insert = function (categorie, result) {
  dbConn.query("INSERT INTO categories set ?", categorie, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

//vérifier si un attribut est vide
Categorie.verifier = function (categorie) {
  if (
    categorie.libelle == "" 
  )
    return true;
};

Categorie.findAll = function (result) {
  dbConn.query("Select * from categories", function (err, res) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Categorie.afficherAll = function (result) {
  dbConn.query("Select * from categories", function (err, res) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Categorie.findById = function (id, result) {
  dbConn.query(
    "Select * from categories where id = ? ",
    id,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Categorie.delete = function (id, result) {
  dbConn.query(
    "DELETE FROM categories WHERE id = ?",
    [id],
    function (err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Categorie.update = function (id, categorie, result) {
  dbConn.query(
    "UPDATE categories SET libelle=? WHERE id = ?",
    [
      categorie.libelle,
      id,
    ],
    function (err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Categorie;
