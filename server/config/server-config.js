module.exports = {
  init(server){
    const logger = require('morgan');

    server.use(logger('dev'));
  }
}