const express = require('express');
const next = require('next');

// checks to see if we are in production environment:
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    const workoutRoutes = require('./routes/workouts.js')

    // server.get('/api/workouts', (req, res) => {
    //   return res.end('Work it!');
    // })

    server.use('/api', workoutRoutes);

    server.get('/refences/:slug', (req, res) => {
      let actualPage = '/reference';
      let queryParams = { title: req.params.slug };
      app.render(req, res, actualPage, queryParams);
    });

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