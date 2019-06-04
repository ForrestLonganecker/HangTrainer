// used to set up express middleware for the server-side app

module.exports = {
  init(server){
    const logger = require('morgan');

    server.use(logger('dev'));
  }
}