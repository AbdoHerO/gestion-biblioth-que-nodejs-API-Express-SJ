const Categorie = require("../models/Categorie");

/*Afficher le fomulaire d'ajout d'un nouveau categorie 
__dirname :retoune le chemin absolue du projet*/
exports.addForm = function (req, res) {
  const message = req.flash("message");

  res.render(__dirname + "/../../src/views/categories/add.ejs", {
    libelle: "",
    message: message,
  });
};

exports.afficherListe = function (req, res) {
  Categorie.findAll(function (err, listCategories) {
    if (err) {
      res.send(err);
    } else {
      res.send(listCategories);
    }
  });
};

exports.insert = function (req, res) {
  // const new_categorie = new Categorie(req.body);
  const new_categorie = JSON.parse(req.body.categorieInfo);;

  Categorie.insert(new_categorie, function (err, categorie) {
    if (err) res.send(err);
    res.json({
      status: true,
      message: "La categorie est bien ajouté",
    });
  });
};

exports.details = function (req, res) {
  Categorie.findById(req.params.id, function (err, categorie) {
    if (err) res.send(err);
    res.send(
      JSON.stringify({ status: true, error: null, response: categorie[0] })
    );
  });
};

exports.destroy = function (req, res) {
  Categorie.delete(req.params.id, function (err, categorie) {
    if (err) res.send(err);
    res.json({ status: true, message: "La categorie est bien supprime" });
  });
};

exports.editForm = function (req, res) {
  Categorie.findById(req.params.id, function (err, categorie) {
    console.log(categorie);
    res.render(__dirname + "/../../src/views/categories/edit.ejs", {
      categorie: categorie[0],
    });
  });
};

exports.edit = function (req, res) {
  // const new_categorie = new Categorie(req.body);
  const new_categorie = JSON.parse(req.body.categorieInfo);;
  Categorie.update(req.params.id, new_categorie, function (err, categorie) {
    if (err) res.send(err);
    res.json({
      status: true,
      message: "La categorie est bien modifié",
    });
  });
};
