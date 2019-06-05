// used to set up express middleware for the server-side app
require('dotenv').config();
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
const passportConfig = require('../config/passport-config');

module.exports = {
  init(server){
    server.use(logger('dev'));
    server.use(session({
      secret: process.env.cookieSecret,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1.21e+9 }
    }));
    server.use(bodyParser.urlencoded({ extended: true }));
    passportConfig.init(server);
    server.use((req, res, next) => {
      res.locals.currentUser = req.user;
      next();
    })
  }
}