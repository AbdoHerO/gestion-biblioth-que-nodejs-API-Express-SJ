/*importer express js pour manipuler les routes*/
const express = require('express');
/*importer le module Router de express js*/
const routerUsers = express.Router();
const userController =   require('../controllers/UserController');

routerUsers.get('/', userController.afficherListe);
routerUsers.get('/add', userController.addForm);
routerUsers.post('/add', userController.insert);

routerUsers.get('/details/:id', userController.details);

routerUsers.get('/edit/:id', userController.editForm);
routerUsers.post('/edit/:id', userController.edit);

routerUsers.get('/delete/:id', userController.destroy);


module.exports = routerUsers