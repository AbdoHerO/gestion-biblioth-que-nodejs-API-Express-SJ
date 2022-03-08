var dbConn = require("./../../config/db");
var Book = function (book) {
  this.id = book.id;
  this.title = book.title;
  this.description = book.description;
  this.id_categorie  = book.id_categorie ;
  this.image  = book.image ;
};

Book.insert = function (book, result) {
  
  dbConn.query("INSERT INTO books set ?", book, function (err, res) {
    
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Book.verifier = function (book) {
  if (
    book.title == "" ||
    book.description == "" ||
    book.id_categorie == null ||
    book.image == ""
  )
    return true;
};


Book.findAll = function (result) {
  dbConn.query(
    "SELECT b.* , c.libelle as categorie FROM `books` b INNER join categories c on b.id_categorie = c.id",
    function (err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Book.findById = function (id, result) {
  dbConn.query("Select b.* , c.libelle as categorie FROM `books` b INNER join categories c on b.id_categorie = c.id where  b.id = ? ", id, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Book.delete = function (id, result) {
  dbConn.query("DELETE FROM books WHERE id = ?", [id], function (err, res) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Book.update = function (id, book, result) {
  dbConn.query(
    "UPDATE books SET title=?,description=?,id_categorie=?,image=? WHERE id = ?",
    [book.title,book.description, book.id_categorie, book.image, id],
    function (err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Book;
