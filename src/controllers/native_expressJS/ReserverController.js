const Reserver = require("../models/Reserver");
const Book = require("../models/Book");
const User = require("../models/User");

/*Afficher le fomulaire d'ajout d'un nouveau Book 
__dirname :retoune le chemin absolue du projet*/
exports.addForm = function (req, res) {

  const message = req.flash("message");
  var listeUsersData;
  var listeBooksData;
  User.findAll(function (err, listeUsers) {
    if (err) {
      req.flash("error", err);
    } else {
      listeUsersData = listeUsers;
    }
    Book.findAll(function (err, listeBooks) {
      if (err) {
        req.flash("error", err);
      } else {
        listeBooksData = listeBooks;
      }

      res.render(__dirname + "/../../src/views/reservations/add.ejs", {
        books: listeBooksData,
        users: listeUsersData,
        dataPrise : "",
        dateRemise: "",
        message: message,
      });
    });
    
  });
};

exports.afficherListe = function (req, res) {
  Reserver.findAll(function (err, listeReservations) {
    if (err) {
      req.flash("error", err);
      res.render(__dirname + "/../../src/views/reservations/index.ejs", { data: "" });
    } else {
      res.render(__dirname + "/../../src/views/reservations/index.ejs", {
        data: listeReservations,
      });
    }
  });
};

exports.insert = function (req, res) {
  
  const new_reservation = new Reserver(req.body);

  if (Reserver.verifier(new_reservation)) {
    req.flash("message", true);
    res.redirect("/apis/admin/reservers/");
  } else {

    Reserver.insert(new_reservation, function (err, Reserver) {
      if (err) res.send(err);

      req.flash("success", new_reservation.id + "La Réservation est bien modifiee");
      res.redirect("/apis/admin/reservers/");
    });
  }
};

exports.details = function (req, res) {
  Reserver.findById(req.params.id, function (err, Reserver) {
    res.render(__dirname + "/../../src/views/reservations/details.ejs", {
      data: Reserver[0],
    });
  });
};

exports.destroy = function (req, res) {
  Reserver.delete(req.params.id, function (err, Reserver) {
    if (err) {
      req.flash("error", err);
      res.redirect("/apis/admin/reservers/");
    } else {
      req.flash("success", "La réservation est supprimé ");
      res.redirect("/apis/admin/reservers/");
    }
  });
};

exports.editForm = function (req, res) {
  var listeUsersData;
  var listeBooksData;
  Reserver.findById(req.params.id, function (err, Reserver) {
    User.findAll(function (err, listeUsers) {
      if (err) {
        req.flash("error", err);
      } else {
        listeUsersData = listeUsers;
      }
      Book.findAll(function (err, listeBooks) {
        if (err) {
          req.flash("error", err);
        } else {
          listeBooksData = listeBooks;
        }
  
        res.render(__dirname + "/../../src/views/reservations/edit.ejs", {
          reserver: Reserver[0],
          books: listeBooksData,
          users: listeUsersData,
        });
      });
      
    });
  });
};

exports.edit = function (req, res) {
  const new_reservation = new Reserver(req.body);
  if (Reserver.verifier(new_reservation)) {
    req.flash("erreur", "Erreur de modification");
    res.redirect("/edit/" + new_reservation.id);
  } else {
    Reserver.update(req.params.id, new_reservation, function (err, Reserver) {
      if (err) {
        req.flash("erreur", "Erreur de modification");
        res.redirect("/edit/" + new_reservation.id);
      } else {
        req.flash("success", new_reservation.id + "Le Reserver est bien modifiee");
        res.redirect("/apis/admin/reservers/");
      }
    });
  }
};
