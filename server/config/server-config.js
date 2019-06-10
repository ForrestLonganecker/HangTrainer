// used to set up express middleware for the server-side app
require('dotenv').config();
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
const passportConfig = require('../config/passport-config');
const express = require('express');
const cookieParser = require('cookie-parser');

module.exports = {
  init(server){
    server.use(logger('dev'));
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({extended: false}));
    server.use(express.json());
    server.use(cookieParser());
    server.use(session({
      secret: process.env.cookieSecret,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1.21e+9 }
    }));
    passportConfig.init(server);
    server.use((req, res, next) => {
      // console.log('{FROM SERVER-CONFIG 1} REQ.USER: ', req.user);
      res.locals.currentUser = req.user;
      // console.log('{FROM SERVER-CONFIG 2} RES.LOCALS.CURRENTUSER: ', res.locals.currentUser);
      next();
    })
  }
}