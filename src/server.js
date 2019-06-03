const express = require('express');
const next = require('next');
const appApi = require('./app.js');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 8000;
const app = next({ dev });
const nextRequestHandler = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    
    server.use(appApi);

    server.get('*', (req, res) => {
      console.log('FROM SERVER: ', req);
      return app.render(req, res, req.url, params);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`Running on localhost:${port}`);
    })
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
