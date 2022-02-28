var dbConn = require("./../../config/db");
var Reserver = function (reserver) {
  this.id = reserver.id;
  this.id_book = reserver.id_book;
  this.id_user = reserver.id_user;
  this.dataPrise  = reserver.dataPrise ;
  this.dateRemise  = reserver.dateRemise ;
};

Reserver.insert = function (reserver, result) {
  
  dbConn.query("INSERT INTO reservations set ?", reserver, function (err, res) {
    
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Reserver.verifier = function (reserver) {
  if (
    reserver.id_book == "" ||
    reserver.id_user == null ||
    reserver.dataPrise == "" ||
    reserver.dateRemise == ""
  )
    return true;
};


Reserver.findAll = function (result) {
  dbConn.query(
    "SELECT r.* , c.libelle as categorie , b.title as book, b.image as book_img, u.full_name as user , u.email as user_email , u.role as user_role, u.active as user_active FROM `reservations` r, users u , categories c, books b Where r.id_book = b.id and r.id_user = u.id and b.id_categorie = c.id",
    function (err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Reserver.findById = function (id, result) {
  dbConn.query("SELECT r.* , c.libelle as categorie , b.title as book, b.image as book_img, u.full_name as user , u.email as user_email , u.role as user_role, u.active as user_active FROM `reservations` r, users u , categories c, books b Where r.id_book = b.id and r.id_user = u.id and b.id_categorie = c.id and r.id = ? ", id, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Reserver.delete = function (id, result) {
  dbConn.query("DELETE FROM reservations WHERE id = ?", [id], function (err, res) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Reserver.update = function (id, reserver, result) {
  dbConn.query(
    "UPDATE reservations SET id_book=?,id_user=?,dataPrise=?,dateRemise=? WHERE id = ?",
    [reserver.id_book,reserver.id_user, reserver.dataPrise, reserver.dateRemise, id],
    function (err, res) {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Reserver;
