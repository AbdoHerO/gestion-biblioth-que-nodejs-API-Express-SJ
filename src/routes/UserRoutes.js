/*importer express js pour manipuler les routes*/
const express = require('express');
const { adminAuth } = require('./privateRoute')
/*importer le module Router de express js*/
const routerUsers = express.Router();
const userController =   require('../controllers/UserController');

routerUsers.get('/' , adminAuth ,userController.afficherListe);

routerUsers.get('/add', adminAuth ,userController.addForm);
routerUsers.post('/add', userController.insert);

routerUsers.get('/details/:id', adminAuth ,userController.details);

routerUsers.get('/edit/:id', adminAuth ,userController.editForm);
routerUsers.post('/edit/:id', adminAuth ,userController.edit);

routerUsers.get('/delete/:id', adminAuth ,userController.destroy);



module.exports = routerUsers