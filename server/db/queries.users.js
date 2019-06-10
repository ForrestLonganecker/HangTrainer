const User = require('./models').User;
const bcrypt = require('bcryptjs');
const authHelper = require('../auth/helpers');

module.exports = {
  createUser(newUser, callback){
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);
    // const hashedPassword = authHelper.encryptPass(newUser.password);
    return User.create({
      email: newUser.email,
      password: hashedPassword
      // password: newUser.password
    }) 
    .then((user) => {
      console.log('{QUERIES.USER}: ', user);
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },
}