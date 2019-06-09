const bcrypt = require('bcryptjs');

module.exports = {
  comparePass(userPassword, databasePassword){
    // console.log('AUTH HELPERS COMPAREPASS: ', bcrypt.compareSync(userPassword, databasePassword));
    console.log('AUTH HELPERS user: ', userPassword);
    console.log('AUTH HELPERS database: ', databasePassword);
    // return bcrypt.compareSync(userPassword, databasePassword);
    return userPassword === databasePassword;
  },
  encryptPass(password){
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  },
}