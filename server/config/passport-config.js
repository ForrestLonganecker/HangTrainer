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
          console.log('{PASSPORT-CONFIG} !USER OR !AUTHHELPER.COMPAREPASS', !user, !authHelper.comparePass(password, user.password));
          // console.log('USER.email: ', user.email);
          // console.log('PASSWORD FROM CLIENT: ', password);
          // console.log('FROM DBUSER.PASSWORD: ', user.password);
          return done(null, false, {message: 'Invalid email or password'});
        }
        // this puts user object in req.session.passport.user = {id: ...}
        console.log('{PASSPORT-CONFIG} USER AUTHENTICATED')
        return done(null, user);
      })
    }));

    passport.serializeUser((user, callback) => {
      console.log('{PASSPORT-CONFIG} USER SERIALIZED: ', user.id, user.email);
      callback(null, user.id);
    });
    
    passport.deserializeUser((id, callback) => {
      User.findByPk(id)
      .then((user) => {
        console.log('{PASSPORT-CONFIG} USER DESERIALIZED: ', id);
        callback(null, user);
      })
      .catch((err) => {
        callback(err, user);
      })
    });
  }
}