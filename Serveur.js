  const express = require('express');
  const bodyParser = require('body-parser');
  var session = require('express-session');
  const fileupload = require("express-fileupload");
  require("dotenv").config();
  const cookieParser = require("cookie-parser");
  const userController =   require('./src/controllers/UserController');
  var flash = require('connect-flash');
  /*Pemert d'authoriser la consommation des api à partir d'un autre serveur
  dans ce cas projet React */
  const cors = require('cors');
  // create express app
  const app = express();

  app.use(fileupload());
  app.use(cors())
  app.use(cookieParser());
  app.use(session({ 
      cookie: { maxAge: 60000 },
      store: new session.MemoryStore,
      saveUninitialized: true,
      resave: 'true',
      secret: 'secret'
  }))



  // Setup server port
  const port = 8083;
  // parse requests => content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }))
  // parse requests => application/json
  app.use(bodyParser.json())
  //envoyer des message de redirection
  app.use(flash());
  //la route principale
  app.get('/', (req, res) => {
    res.render(__dirname+'/index.ejs');
  });
  app.use(express.static('public'))


  const routerUsers = require('./src/routes/UserRoutes')
  const routerBooks = require('./src/routes/BookRoutes')
  const routerCategories = require('./src/routes/CategorieRoutes')
  const routerReservers = require('./src/routes/ReserverRoutes')

  // const routerBooksUsers = require('./src/routes/UserBookRoutes')
  // const routerReservationsUsers = require('./src/routes/UserReservationRoutes')
  // const routerStatistiques = require('./src/routes/StatistiqueRoutes')
  app.post('/apis/login', userController.login);
  app.post('/apis/register', userController.register);
  app.use('/apis/admin/users/' , routerUsers)
  app.use('/apis/admin/books/', routerBooks)
  app.use('/apis/admin/categories/', routerCategories)
  app.use('/apis/admin/reservers/', routerReservers)
  app.get("/apis/logout", (req, res) => {
    res.cookie("jwt", "", { maxAge: "1" })
    res.send('logout')
  })
  // app.use('/apis/admin/statistiques/', routerStatistiques)
  // app.use('/apis/books/',routerBooksUsers)
  // app.use('/apis/reservations/',routerReservationsUsers)

  // lancer le serveur
  app.listen(port, () => {
    console.log('serveur starts');
  });