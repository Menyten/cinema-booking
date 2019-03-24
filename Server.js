const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const CreateRestRoutes = require('./CreateRestRoutes');
const connectionString = require('./connectionString.js');
const LoginHandler = require('./LoginHandler');
const settings = require('./settings.json');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const http = require('http');
const SocketIoController = require('./SocketIoController');

module.exports = class Server {
  constructor() {
    this.start();
  }

  async start() {
    await this.connectToDb();
    await this.startWebServer();
  }

  // connectToDb() {
  //   return new Promise((resolve, reject) => {
  //     mongoose.connect(connectionString, { useNewUrlParser: true });
  //     global.db = mongoose.connection;
  //     db.on('error', () => reject('Could not connect to DB'));
  //     db.once('open', () => resolve('Connected to DB'));
  //   });
  // }

  connectToDb() {
    return new Promise((resolve, reject) => {
      mongoose.connect(connectionString, { useNewUrlParser: true });
      global.passwordSalt = settings.passwordSalt;
      global.db = mongoose.connection;
      db.on('error', () => reject('Could not connect to DB'));
      db.once('open', () => resolve('Connected to DB'));
    });
  }

  startWebServer() {

    const app = express();
    // Add body-parser to our requests
    app.use(bodyParser.json());

    app.use(session({
      secret: settings.cookieSecret,
      resave: true,
      saveUninitialized: true,
      store: new MongoStore({
        mongooseConnection: global.db
      })
    }));

    // Set keys to names of rest routes
    const models = {
      movies: require('./schemas/Movie'),
      auditoriums: require('./schemas/Auditorium'),
      showtimes: require('./schemas/Showtime'),
      users: require('./schemas/User'),
      bookings: require('./schemas/Booking'),
    };
    global.models = models;



    // create all necessary rest routes for the models
    new CreateRestRoutes(app, global.db, models);

    new LoginHandler(app, models.users);

    app.all('/json/*', (req, res) => {
      res.json({ url: req.url, ok: true });
    });

    const server = http.Server(app);
    server.listen(3001, () => console.log('Listening on port 3001'));
    
    new SocketIoController(server);
  }

}