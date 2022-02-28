/*importer express js pour manipuler les routes*/
const express = require('express');
/*importer le module Router de express js*/
const routerCategories = express.Router();
const categorieController =   require('../controllers/CategorieController');

routerCategories.get('/', categorieController.afficherListe);
routerCategories.get('/add', categorieController.addForm);
routerCategories.post('/add', categorieController.insert);

routerCategories.get('/details/:id', categorieController.details);

routerCategories.get('/edit/:id', categorieController.editForm);
routerCategories.post('/edit/:id', categorieController.edit);

routerCategories.get('/delete/:id', categorieController.destroy);


module.exports = routerCategories