const User = require("../models/User");
const{ registerValidation , loginValidation} = require("../validation/UserValidation")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



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


exports.login =  (req, res) =>{
  const {error} = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  
  var emailExist ; 
  User.findOne(req.body.email, async function (err, user) {
    try{

    if (err) res.send(err);

    if(user[0]) emailExist = user[0].email;
    
    if(!emailExist) return res.status(400).send("email  is wrong")
  
    let validPass = await bcrypt.compare(req.body.password,user[0].password) 
    if(!validPass)  return  res.status(400).send("invalid password")
   
    
    User.login(req.body.email,user[0].password, (err, user)=>{
      if(err) /*Si erreur */ res.send({status: false, message: 'Erreur '});
       
      /*Si Ok*/  
      const token = jwt.sign({id : user[0].id,role : user[0].role}, process.env.TOKEN_SCRET)
      
      res.send(token);
      
  })
    }catch{
      res.status(500).send()
    }
  });
  
  
}

exports.register = function (req, res) {
  //return res.send(req.body.userInfo) 

  // validation
  const {error} = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  
  // check if exist
  var emailExist ; 
  User.findOne(req.body.email, async function (err, user) {
    if (err) res.send(err);

    if(user[0]) emailExist = JSON.stringify(user[0].email);

    if(emailExist) return res.status(400).send("email Already Exist")
    // hash password
     const salt = await bcrypt.genSalt(10); 
     const HashPassword = await bcrypt.hash(req.body.userInfo.password,salt)
    
    // insert user
    const new_user = new User({
       full_name : req.body.userInfo.full_name,
       email : req.body.userInfo.email,
       password : HashPassword,
       role : 'user',
       photo : req.body.userInfo.photo,
    });
    if(req.files != null){
      const file = req.files.photo;
      const fileName = file.name;
  
      let path_uploade = "./public/users_images/";
      
      file.mv(path_uploade + fileName, (err) => {
        if (!err) {
          new_user.photo = "users_images/" + fileName;
          User.register(new_user, function (err_, user) {
            if (err_) res.send(err_);
            const token = jwt.sign({id : user[0].id,role : user[0].role}, process.env.TOKEN_SCRET)
            res.send(token);
          });
        } else {
          res.send(err);
        }
      });
    }else{
      User.register(new_user, function (err_, user) {
        if (err_) res.send(err_);
        const token = jwt.sign({id : user[0].id,role : user[0].role}, process.env.TOKEN_SCRET)
        res.send(token);
      });
    }
  });
  
  

  // insert user

};