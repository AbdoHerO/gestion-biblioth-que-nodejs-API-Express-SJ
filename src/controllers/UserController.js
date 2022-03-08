const User = require("../models/User");

/*Afficher le fomulaire d'ajout d'un nouveau user 
__dirname :retoune le chemin absolue du projet*/
exports.addForm = function (req, res) {
  const message = req.flash("message");

  res.render(__dirname + "/../../src/views/users/add.ejs", {
    full_name: "",
    email: "",
    password: "",
    active: "",
    role: "",
    photo: "",
    message: message,
  });
};

exports.afficherListe = function (req, res) {
  User.findAll(function (err, listUsers) {
    if (err) {
      req.flash("error", err);
      res.render(__dirname + "/../../src/views/users/index.ejs", { data: "" });
    } else {
      res.render(__dirname + "/../../src/views/users/index.ejs", {
        data: listUsers,
      });
    }
  });
};

exports.insert = function (req, res) {
  const new_user = new User(req.body);

  if (User.verifier(new_user)) {
    req.flash("message", true);
    res.redirect("/apis/admin/users/");
  } else {
    const file = req.files.photo;
    const fileName = file.name;

    let path_uploade = "./public/users_images/";
    file.mv(path_uploade + fileName, (err) => {
      if (!err) {
        new_user.photo = "users_images/" + fileName;
        User.insert(new_user, function (err, user) {
          if (err) res.send(err);
          req.flash("message", false);
          res.redirect("/apis/admin/users/");
        });
      } else {
        req.flash("erreur", "Erreur file upload");
      }
    });
  }
};

/*Afficher les détails d'un user*/
exports.details = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    res.render(__dirname + "/../../src/views/users/details.ejs", {
      data: user[0],
    });
  });
};

/*Supprimer un user par sont id*/
exports.destroy = function (req, res) {
  User.delete(req.params.id, function (err, user) {
    if (err) {
      req.flash("error", err);
      res.redirect("/apis/admin/users/");
    } else {
      req.flash("success", "User est supprimé ");
      res.redirect("/apis/admin/users/");
    }
  });
};

exports.editForm = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    console.log(user);
    res.render(__dirname + "/../../src/views/users/edit.ejs", {
      user: user[0],
    });
  });
};

/*Valider la modification d'un user*/
exports.edit = function (req, res) {
  const new_user = new User(req.body);
  if (User.verifier(new_user)) {
    req.flash("erreur", "Erreur de modification");
    res.redirect("/edit/" + new_user.id);
  } else {
    const file = req.files.photo;
    const fileName = file.name;

    let path_uploade = "./public/users_images/";
    file.mv(path_uploade + fileName, (err) => {
      if (!err) {
        new_user.photo = "users_images/" + fileName;
        User.update(req.params.id, new_user, function (err, user) {
          if (err) {
            req.flash("erreur", "Erreur de modification");
            res.redirect("/apis/admin/users/edit/" + new_user.id);
          } else {
            req.flash(
              "success",
              new_user.full_name + "Le user est bien modifier"
            );
            res.redirect("/apis/admin/users/");
          }
        });
      } else {
        req.flash("erreur", "Erreur file upload");
      }
    });
  }
};
