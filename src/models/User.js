/*importer le fichier de configuration de connexion à la base de données*/
var dbConn = require('./../../config/db');
var User = function(user){
  this.id = user.id;
  this.full_name = user.full_name;
  this.email = user.email;
  this.password = user.password;
  this.active = 1;
  this.role = user.role;
  this.photo = user.photo;

};

User.insert = function (user, result) {

dbConn.query("INSERT INTO users set ?", user, function (err, res) {
if(err) {

  console.log("error: ", err);
  result(err, null);
}
else{
  console.log(res.insertId);
  result(null, res.insertId);
}
});
};

//vérifier si un attribut est vide 
User.verifier=function(user)
{
    if(user.full_name=='' || user.email=='' || user.password=='' || user.active=='' || user.role=='' || user.photo=='')
    return true;
};

User.findAll = function (result) {
  dbConn.query("Select * from users", function (err, res) {
  if(err) {
  result(null, err);
  }
  else{
  result(null, res);
  }
  });
  };

User.afficherAll = function (result) {
  dbConn.query("Select * from users", function (err, res) {
  if(err) {
  result(null, err);
  }
  else{
  result(null, res);
  }
  });
  };



User.findById = function (id, result) {
  dbConn.query("Select * from users where id = ? ", id, function (err, res) {
  if(err) {
    result(err, null);
  }
  else{
    result(null, res);
  }
  });
  };
User.findOne = function (email,result) {
    const emailExist = dbConn.query("Select * from users where email = ? ", email,function (err, res) {
      if(err) {
        result(err, null);
      }
      else{
        result(null, res);
      }
      });
    };

User.delete = function(id, result){
  dbConn.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {
  if(err) {
  result(null, err);
  }
  else{
  result(null, res);
  }
  });
  };

User.update = function(id, user, result){
  dbConn.query("UPDATE users SET full_name=?,email=?,password=?,active=?,role=?,photo=? WHERE id = ?", [user.full_name,user.email,user.password,user.active,user.role,user.photo, id], function (err, res) {
  if(err) {
  result(null, err);
  }else{
  result(null, res);
  }
  });
  };


  
User.login = (email,password,result) =>{
  dbConn.query('SELECT id,email,full_name,photo,active,role FROM users where email=? and password=?',[email,password] ,(err, res)=>{
    
      if(err){
          result(err,null);
      }else{
  /*Retourne l'utilisateur et l'envoyer à React*/
          result(null,res);
      }
  })
 }
 User.register = function (user, result) {

  dbConn.query("INSERT INTO users set ?", user, function (err, res) {
  if(err) {
  
    console.log("error: ", err);
    result(err, null);
  }
  else{
    dbConn.query("select * from users where id = ?", res.insertId, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      result(null, res);
    }
    })
  
  }
  });
  };
module.exports= User;