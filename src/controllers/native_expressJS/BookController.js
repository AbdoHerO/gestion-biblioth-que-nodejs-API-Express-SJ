const Book = require("../models/Book");
const Categorie = require("../models/Categorie");

/*Afficher le fomulaire d'ajout d'un nouveau Book 
__dirname :retoune le chemin absolue du projet*/
exports.addForm = function (req, res) {
  const message = req.flash("message");
  var listeCategoriesData;
  Categorie.findAll(function (err, listeCategories) {
    if (err) {
      req.flash("error", err);
    } else {
      listeCategoriesData = listeCategories;
    }
    res.render(__dirname + "/../../src/views/books/add.ejs", {
      title: "",
      description: "",
      categories: listeCategoriesData,
      image: "",
      message: message,
    });
  });
};

exports.afficherListe = function (req, res) {
  Book.findAll(function (err, listeBooks) {
    if (err) {
      req.flash("error", err);
      res.render(__dirname + "/../../src/views/books/index.ejs", { data: "" });
    } else {
      res.render(__dirname + "/../../src/views/books/index.ejs", {
        data: listeBooks,
      });
    }
  });
};

exports.insert = function (req, res) {
  const new_book = new Book(req.body);

  if (Book.verifier(new_book)) {
    req.flash("message", true);
    res.redirect("/apis/admin/books/");
  } else {
    const file = req.files.image;
    const fileName = file.name;

    let path_uploade = "./public/books_images/";
    file.mv(path_uploade + fileName, (err) => {
      if (!err) {
        new_book.photo = "books_images/" + fileName;
        Book.insert(new_book, function (err, Book) {
          if (err) res.send(err);

          req.flash("success", new_book.title + "Le Book est bien modifiee");
          res.redirect("/apis/admin/books/");
        });
      } else {
        req.flash("erreur", "Erreur file upload");
      }
    });
  }
};

exports.details = function (req, res) {
  Book.findById(req.params.id, function (err, Book) {
    res.render(__dirname + "/../../src/views/books/details.ejs", {
      data: Book[0],
    });
  });
};

exports.destroy = function (req, res) {
  Book.delete(req.params.id, function (err, Book) {
    if (err) {
      req.flash("error", err);
      res.redirect("/apis/admin/books/");
    } else {
      req.flash("success", "Book est supprimé ");
      res.redirect("/apis/admin/books/");
    }
  });
};

exports.editForm = function (req, res) {
  var listeCategoriesData;
  Book.findById(req.params.id, function (err, Book) {
    Categorie.findAll(function (err, listeCategories) {
      if (err) {
        req.flash("error", err);
      } else {
        listeCategoriesData = listeCategories;
      }
      res.render(__dirname + "/../../src/views/books/edit.ejs", {
        book: Book[0],
        categories: listeCategoriesData,
      });
    });
  });
};

exports.edit = function (req, res) {
  const new_book = new Book(req.body);
  if (Book.verifier(new_book)) {
    req.flash("erreur", "Erreur de modification");
    res.redirect("/edit/" + new_book.id);
  } else {
    const file = req.files.image;
    const fileName = file.name;

    let path_uploade = "./public/books_images/";
    file.mv(path_uploade + fileName, (err) => {
      if (!err) {
        new_book.photo = "books_images/" + fileName;
        Book.update(req.params.id, new_book, function (err, Book) {
          if (err) {
            req.flash("erreur", "Erreur de modification");
            res.redirect("/edit/" + new_book.id);
          } else {
            req.flash("success", new_book.id + "Le Book est bien modifiee");
            res.redirect("/apis/admin/books/");
          }
        });
      } else {
        req.flash("erreur", "Erreur file upload");
      }
    });
  }
};
