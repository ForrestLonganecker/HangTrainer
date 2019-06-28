const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../db/models').User;
const authHelper = require('../auth/helpers');

module.exports = {
  init(server){
    server.use(passport.initialize());
    server.use(passport.session());

    passport.use(new LocalStrategy({
      // overwrites default username field
      usernameField: 'email'
    }, (email, password, done) => {
      User.findOne({where: {email}})
      .then((user) => {
        if(!user || !authHelper.comparePass(password, user.password)) {
          return done(null, false, {message: 'Invalid email or password'});
        }
        // this puts user object in req.session.passport.user = {id: ...}
        return done(null, user);
      });
    }));

    passport.serializeUser((user, callback) => {
      // called when passport initializes it's session
      callback(null, user.id);
    });
    
    passport.deserializeUser((id, callback) => {
      User.findByPk(id)
      .then((user) => {
        // called every time a request is made to the 
        // server and has matching session details
        callback(null, user);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }
};