const userQueries = require('../db/queries.users.js');
const passport = require('passport');

module.exports = {
  // I believe this will actually just be handled through the front end via pages and <Link>
  // signUp(req, res, next){
  //   res.send('Sign up');
  // },
  create(req, res, next){
    console.log('{USER CONTROLLER CREATE 1} REQ.BODY: ', req.body);
    let newUser = {
      email: req.body.email,
      password: req.body.password,
    };
    console.log('{USER CONTROLLER CREATE 2} NEWUSER: ', newUser);
    userQueries.createUser(newUser, (err, user) => {
      if(err){
        console.log('{USER CONTROLLER CREATE 3} IF ERR: ', err);
        // need to find a way to pass this to the front end
        // req.flash('error', err);
        err.statusCode = 400; 
        res.send(err);
      } else {
        console.log('{USER CONTROLLER CREATE 4} ELSE AUTH: ', req.body);
        passport.authenticate('local')(req, res, () => {
          // need to find a way to pass this to the front end
          // req.flash('notice', 'You have successfully signed in!');
          res.send(req.user);
        })
      }
    })
  },
  signIn(req, res, next){
    console.log('{USER CONTROLLER - SIGN IN} REQ.BODY: ', req.body);
    passport.authenticate('local')(req, res, () => {
      if(!req.user){
        // if error(no user logged in)
        console.log('{USERCONTROLLER - SIGN IN} IF !REQ.USER: ', res.statusCode);
        res.send(req.user);
      } else {
        // if successful pass the cookie to front end
        console.log('{USERCONTROLLER - SIGN IN} AUTHENTION SUCCESS: ', res.statusCode);
        res.send(req.user);
      }
    })
  },
  signOut(req, res, next){
    if(req.user){
      console.log('SUCCESSFULLY SIGNED OUT');
      req.logout();
      res.send('SUCCESSFULLY SIGNED OUT');
    } else {
      console.log('NO REQ.USER FOUND', req.user);
    }
  }
}