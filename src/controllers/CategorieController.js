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
      req.flash("error", err);
      res.render(__dirname + "/../../src/views/categories/index.ejs", { data: "" });
    } else {
      res.render(__dirname + "/../../src/views/categories/index.ejs", {
        data: listCategories,
      });
    }
  });
};

exports.insert = function (req, res) {
  const new_categorie = new Categorie(req.body);

  if (Categorie.verifier(new_categorie)) {
    req.flash("message", true);
    res.redirect("/apis/admin/categories/");
  } else {
    Categorie.insert(new_categorie, function (err, categorie) {
      if (err) res.send(err);
      req.flash("message", false);
      res.redirect("/apis/admin/categories/");
    });
  }
};

exports.details = function (req, res) {
  Categorie.findById(req.params.id, function (err, categorie) {
    res.render(__dirname + "/../../src/views/categories/details.ejs", {
      data: categorie[0],
    });
  });
};

exports.destroy = function (req, res) {
  Categorie.delete(req.params.id, function (err, categorie) {
    if (err) {
      req.flash("error", err);
      res.redirect("/apis/admin/categories/");
    } else {
      req.flash("success", "categorie est supprimé ");
      res.redirect("/apis/admin/categories/");
    }
  });
};

exports.editForm = function (req, res) {
  Categorie.findById(req.params.id, function (err, categorie) {
    console.log(categorie)
    res.render(__dirname + "/../../src/views/categories/edit.ejs", {
      categorie: categorie[0],
    });
  });
};

exports.edit = function (req, res) {
  const new_categorie = new Categorie(req.body);
  if (Categorie.verifier(new_categorie)) {
    req.flash("erreur", "Erreur de modification");
    res.redirect("/edit/" + new_categorie.id);
  } else {
    Categorie.update(req.params.id, new_categorie, function (err, categorie) {
      if (err) {
        req.flash("erreur", "Erreur de modification");
        res.redirect("/apis/admin/categories/edit/" + new_categorie.id);
      } else {
        req.flash("success", new_categorie.libelle + "Le categorie est bien modifier");
        res.redirect("/apis/admin/categories/");
      }
    });
  }
};
