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
      res.send(err);
    } else {
      res.send(listUsers);
    }
  });
};

exports.insert = function (req, res) {
  const new_user = JSON.parse(req.body.userInfo);

  if (req.files != null) {
    const file = req.files.photo;
    const fileName = file.name;
    let path_uploade = "./public/users_images/";
    file.mv(path_uploade + fileName, (err) => {
      if (!err) {
        new_user.photo = req.protocol + '://' + req.get('host')+"users_images/" + fileName;
        User.insert(new_user, function (err_, user) {
          if (err_) res.send(err_);
          res.json({
            status: true,
            message: "Le user est bien ajouté",
          });
        });
      } else {
        res.send(err);
      }
    });
  } else {
    new_user.photo = "";
    User.insert(new_user, function (err_, user) {
      if (err_) res.send(err_);
      res.json({
        status: true,
        message: "Le user est bien ajouté",
      });
    });
  }
};

/*Afficher les détails d'un user*/
exports.details = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) res.send(err);
    res.send(JSON.stringify({ status: true, error: null, response: user[0] }));
  });
};

/*Supprimer un user par sont id*/
exports.destroy = function (req, res) {
  User.delete(req.params.id, function (err, user) {
    if (err) res.send(err);
    res.json({ status: true, message: "Le user est bien supprime" });
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
  const new_user = JSON.parse(req.body.userInfo);

  if (req.files != null) {
    const file = req.files.photo;
    const fileName = file.name;

    let path_uploade = "./public/users_images/";
    file.mv(path_uploade + fileName, (err) => {
      if (!err) {
        new_user.photo = req.protocol + '://' + req.get('host')+"users_images/" + fileName;
        User.update(req.params.id, new_user, function (err_, user) {
          if (err_) res.send(err_);
          res.json({
            status: true,
            message: "Le user est bien modifié",
          });
        });
      } else {
        req.flash("erreur", "Erreur file upload");
      }
    });
  } else {
    User.update(req.params.id, new_user, function (err_, user) {
      if (err_) res.send(err_);
      res.json({
        status: true,
        message: "Le user est bien modifié",
      });
    });
  }
};
