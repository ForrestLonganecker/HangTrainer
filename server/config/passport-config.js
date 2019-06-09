const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../db/models').User;
const authHelper = require('../auth/helpers');

module.exports = {
  init(server){
    server.use(passport.initialize());
    server.use(passport.session());

    passport.use(new LocalStrategy({
      usernameField: 'email'
    }, (email, password, done) => {
      User.findOne({where: {email}})
      .then((user) => {
        console.log('{PASSPORT-CONFIG} USER.EMAIL: ', user.email);
        if(!user || !authHelper.comparePass(password, user.password)) {
          return done(null, false, {message: 'Invalid email or password'});
        }
        // this puts user object in req.session.passport.user = {id: ...}
        return done(null, user);
      })
    }));

    passport.serializeUser((user, callback) => {
      console.log('{PASSPORT-CONFIG} USER SERIALIZED: ', user.id, user.email);
      callback(null, user.id);
    });
    
    passport.deserializeUser((id, callback) => {
      console.log('{PASSPORT-CONFIG} USER DESERIALIZED: ', id);
      User.findByPk(id)
      .then((user) => {
        callback(null, user);
      })
      .catch((err) => {
        callback(err, user);
      })
    });
  }
}