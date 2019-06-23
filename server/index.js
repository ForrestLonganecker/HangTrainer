const express = require('express');
const next = require('next');
const { parse } = require('url');

// checks to see if we are in production environment:
const PORT = normalizePort(process.env.PORT || 3000);
const dev = process.env.NODE_ENV !== 'production';

// starts the next.js client-side app
const app = next({ dev });
const handle = app.getRequestHandler();

function normalizePort(val) {
  const port = parseInt(val, 10);
  if(isNaN(port)) {
    return val;
  }
  if(port >= 0) {
    return port;
  }
  return false;
}

app
  .prepare()
  .then(() => {
    const server = express();
    // imports middleware for the server-side app
    const serverConfig = require('./config/server-config.js')
    // imports all routes for the server-side app
    const routeConfig = require('./config/route-config.js')

    // initializes all imported routes + middleware
    serverConfig.init(server);
    routeConfig.init(server);


    // server.get((req, res) => {
    //   const parsedUrl = parse(req.url, true);
    //   const { pathname, query } = parsedUrl;

    //   if (pathname === '/') {
    //     app.render(req, res, '/', query);
    //   } else if (pathname === '/landing') {
    //     app.render(req, res, '/landing', query);
    //   } else if (pathname === '/workouts') {
    //     app.render(req, res, '/workouts', query);
    //   } else {
    //     handle(req, res, parsedUrl);
    //   }
    // });

    // server.get('/landing', (req, res) => {
    //   console.log('SERVER.GET/LANDING');
    //   app.render(req, res, '/landing', req.query);
    // });

    server.get("*", (req, res) => {
      // console.log('{SERVER/INDEX.JS} REQ: ', req.originalUrl);
      // console.log('{SERVER/INDEX.JS} RES: ');
      return handle(req, res, req.url);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`server is listening on PORT: ${PORT}`);
    });

  })
  .catch(ex => {
    console.log(ex.stack);
    process.exit(1);
});