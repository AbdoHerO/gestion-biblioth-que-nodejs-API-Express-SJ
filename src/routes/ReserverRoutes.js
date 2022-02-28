/*importer express js pour manipuler les routes*/
const express = require('express');
/*importer le module Router de express js*/
const routerReserver = express.Router();
const reserverController =   require('../controllers/ReserverController');

routerReserver.get('/', reserverController.afficherListe);
routerReserver.get('/add', reserverController.addForm);
routerReserver.post('/add', reserverController.insert);

routerReserver.get('/details/:id', reserverController.details);

routerReserver.get('/edit/:id', reserverController.editForm);
routerReserver.post('/edit/:id', reserverController.edit);

routerReserver.get('/delete/:id', reserverController.destroy);


module.exports = routerReserver