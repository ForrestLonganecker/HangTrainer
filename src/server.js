const express = require('express');
const next = require('next');
const http = require('http');
const apiApp = require('./app.js');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 8000;
const app = next({ dev });
const nextRequestHandler = app.getRequestHandler();

app.prepare()
.then(() => {
  const server = express();

  server.get('*', (req, res) => {
    return nextRequestHandler(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;

    // apiApp(server);

    console.log(`Running on localhost:${port}`);
  })
})
.catch(ex => {
  console.error(ex.stack);
  process.exit(1);
});

// const app = require('./app');
// const http = require('http');
// const server = http.createServer(app);
// const port = normalizePort(process.env.PORT || '3000');
// app.set('port', port);

// server.listen(port);

// function normalizePort(val) {
//   const port = parseInt(val, 10);
//   if(isNaN(port)) {
//     return val;
//   }
//   if(port >= 0) {
//     return port;
//   }
//   return false;
// }

// server.on('listening', () => {
//   console.log(`server is listening for requests on port: ${server.address().port}`);
// });