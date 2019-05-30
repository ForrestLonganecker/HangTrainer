module.exports = {
  init(app){
    const staticRoutes = require('../routes/static');

    console.log('FROM ROUTE-CONFIG');

    app.use(staticRoutes);
  }
}