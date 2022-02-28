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
      res.send(err);
    } else {
      res.send(listeReservations);
    }
  });
};

exports.insert = function (req, res) {
  
  const new_reservation = new Reserver(req.body);

  if (Reserver.verifier(new_reservation)) {
        res.json({ status: true, message: "reservation not found" });
  } else {

    Reserver.insert(new_reservation, function (err, Reserver) {
      if (err) res.send(err);
          res.json({
            status: true,
            message: "La reservation est bien ajouté"
          });
    });
  }
};

exports.details = function (req, res) {
  Reserver.findById(req.params.id, function (err, Reserver) {
    if (err) res.send(err);
    res.send(
      JSON.stringify({ status: true, error: null, response: Reserver[0] })
    );
  });
};

exports.destroy = function (req, res) {
  Reserver.delete(req.params.id, function (err, Reserver) {
    if (err) res.send(err);
    res.json({ status: true, message: "La reservation est bien supprime" });
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
    res.json({ status: true, message: "reservation error when update, ID" + new_reservation.id });
  } else {
    Reserver.update(req.params.id, new_reservation, function (err, Reserver) {
      if (err) res.send(err);
          res.json({
            status: true,
            message: "La reservations est bien modifié"
          });
    });
  }
};
