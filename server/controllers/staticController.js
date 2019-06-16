const passport = require('passport');

module.exports = {
  index(req, res, next){
    res.send(res.locals.currentUser);
    // console.log('{STATIC-CONTROLLER} RES.LOCALS', res.locals.currentUser);
    // console.log('{STATIC-CONTROLLER} REQ: ');
  },
}