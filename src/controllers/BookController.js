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
      res.send(err);
    } else {
      res.send(listeBooks);
    }
  });
};

exports.insert = function (req, res) {
  const new_book = JSON.parse(req.body.bookInfo);

  if (req.files != null) {
    const file = req.files.file;
    const fileName = file.name;
    console.log(new_book);
    let path_uploade = "./public/books_images/";
    file.mv(path_uploade + fileName, (err) => {
      if (!err) {
        new_book.image = "books_images/" + fileName;
        Book.insert(new_book, function (err_, Book) {
          if (err_) res.send(err_);
          res.json({
            status: true,
            message: "Le book est bien ajouté",
          });
        });
      } else {
        res.send(err);
      }
    });
  } else {
    new_book.image = "";
    Book.insert(new_book, function (err_, Book) {
      if (err_) res.send(err_);
      res.json({
        status: true,
        message: "Le book est bien ajouté",
      });
    });
  }
};

exports.details = function (req, res) {
  Book.findById(req.params.id, function (err, Book) {
    if (err) res.send(err);
    res.send(JSON.stringify({ status: true, error: null, response: Book[0] }));
  });
};

exports.destroy = function (req, res) {
  Book.delete(req.params.id, function (err, Book) {
    if (err) res.send(err);
    res.json({ status: true, message: "Le book est bien supprime" });
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
      if (err) res.send(err);
      res.send(
        JSON.stringify({ status: true, error: null, response: [Book[0]] })
      );
    });
  });
};

exports.edit = function (req, res) {
  const new_book = JSON.parse(req.body.bookInfo);
  // console.log(req.files);
  if (req.files != null) {
    const file = req.files.file;
    const fileName = file.name;
    let path_uploade = "./public/books_images/";
    file.mv(path_uploade + fileName, (err) => {
      if (!err) {
        new_book.image = "books_images/" + fileName;
        Book.update(req.params.id, new_book, function (err_, Book) {
          if (err_) res.send(err_);
          res.json({
            status: true,
            message: "Le book est bien modifié",
          });
        });
      } else {
        res.send(err);
      }
    });
  } else {
    Book.update(req.params.id, new_book, function (err_, Book) {
      if (err_) res.send(err_);
      res.json({
        status: true,
        message: "Le book est bien modifié",
      });
    });
  }
};
