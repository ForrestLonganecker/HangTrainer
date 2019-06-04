const express = require('express');
const next = require('next');

// checks to see if we are in production environment:
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';

// starts the next.js client-side app
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    // imports all routes for the server-side app
    const routeConfig = require('./config/route-config.js')
    // imports middleware for the server-side app
    const serverConfig = require('./config/server-config.js')

    // initializes all imported routes + middleware
    routeConfig.init(server);
    serverConfig.init(server);

    // cannot get dynamic routes to work
    // 
    // server.get('/refences/:id', (req, res) => {
    //   let actualPage = '/reference';
    //   let queryParams = { title: req.params.id };
    //   app.render(req, res, actualPage, queryParams);
    // });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`server is listening on PORT: ${PORT}`)
    });

  })
  .catch(ex => {
    console.log(ex.stack);
    process.exit(1);
});