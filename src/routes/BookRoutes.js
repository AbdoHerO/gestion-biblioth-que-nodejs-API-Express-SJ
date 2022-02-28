/*importer express js pour manipuler les routes*/
const express = require('express');
/*importer le module Router de express js*/
const routerBooks = express.Router();
const bookController =   require('../controllers/BookController');

routerBooks.get('/', bookController.afficherListe);
routerBooks.get('/add', bookController.addForm);
routerBooks.post('/add', bookController.insert);

routerBooks.get('/details/:id', bookController.details);

routerBooks.get('/edit/:id', bookController.editForm);
routerBooks.post('/edit/:id', bookController.edit);

routerBooks.get('/delete/:id', bookController.destroy);


module.exports = routerBooks