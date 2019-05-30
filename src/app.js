const express = require('express');
const app = express();

const appConfig = require('./config/main-config.js');
const routeConfig = require('./config/route-config.js');

console.log('FROM APP.JS BEFORE APPCONFIG.INIT');

appConfig.init();
routeConfig.init(app);

module.exports = app;