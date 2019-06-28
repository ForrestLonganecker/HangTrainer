const userQueries = require('../db/queries.users.js');
const passport = require('passport');

module.exports = {
  create(req, res){
    let newUser = {
      email: req.body.email,
      password: req.body.password,
    };
    userQueries.createUser(newUser, (err, user) => {
      if(err){
        err.statusCode = 400; 
        res.send(err);
      } else {
        passport.authenticate('local')(req, res, () => {
          res.send(req.user);
        });
      }
    });
  },
  signIn(req, res, next){
    passport.authenticate('local')(req, res, () => {
      if(!req.user){
        // if error(no user logged in)
        res.send(req.user);
      } else {
        // if successful pass the cookie to front end
        res.send(req.user);
      }
    });
  },
  signOut(req, res, next){
    if(req.user){
      req.logout();
      res.send('SUCCESSFULLY SIGNED OUT');
    } else {
      let err = 'Error signing out';
      res.send(err);
    }
  }
};