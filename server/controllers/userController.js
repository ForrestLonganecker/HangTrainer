const userQueries = require('../db/queries.users.js');
const passport = require('passport');

module.exports = {
  // I believe this will actually just be handled through the front end via pages and <Link>
  signUp(req, res, next){
    res.send('Sign up');
  },
  create(req, res, next){
    console.log('{USER CONTROLLER 1} REQ: ', req.data);
    console.log('{USER CONTROLLER 1} REQ: ', req.params);
    let newUser = {
      email: req.body.newUser.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    };
    userQueries.createUser(newUser, (err, user) => {
      if(err){
        // need to find a way to pass this to the front end
        // req.flash('error', err);
        res.redirect('/signUp');
      } else {
        passport.authenticate('local')(req, res, () => {
          // need to find a way to pass this to the front end
          // req.flash('notice', 'You have successfully signed in!');
          res.redirect('/index');
        })
      }
    })
  }
}