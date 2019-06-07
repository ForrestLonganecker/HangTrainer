const userQueries = require('../db/queries.users.js');
const passport = require('passport');

module.exports = {
  // I believe this will actually just be handled through the front end via pages and <Link>
  // signUp(req, res, next){
  //   res.send('Sign up');
  // },
  create(req, res, next){
    // console.log('{USER CONTROLLER 1} REQ.BODY: ', req.body);
    let newUser = {
      email: req.body.email,
      password: req.body.password,
      // move password confirmation/ bcrypt to frontend 
      passwordConfirmation: req.body.passwordConfirmation
    };
    userQueries.createUser(newUser, (err, user) => {
      if(err){
        console.log('{USER CONTROLLER 2} IF ERR: ', );
        // need to find a way to pass this to the front end
        // req.flash('error', err);
        res.send(err);
      } else {
        console.log('{USER CONTROLLER 3} ELSE AUTH: ', );
        passport.authenticate('local')(req, res, () => {
          // need to find a way to pass this to the front end
          // req.flash('notice', 'You have successfully signed in!');
          res.end('Success!');
        })
      }
    })
  },
  signIn(req, res, next){
    passport.authenticate('local')(req, res, () => {
      if(!req.user){
        res.send('FAILED TO SIGN IN');
      } else {
        res.send('SUCCESSFULLY SIGNED IN');
      }
    })
  },
  signOut(req, res, next){
    req.logout();
    res.send('SUCCESSFULLY SIGNED OUT');
  }
}