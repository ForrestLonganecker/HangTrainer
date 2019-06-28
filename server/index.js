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

    server.get("*", (req, res) => {
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