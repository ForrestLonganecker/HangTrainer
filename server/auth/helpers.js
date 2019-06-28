const bcrypt = require('bcryptjs');

module.exports = {
  comparePass(userPassword, databasePassword){
    return bcrypt.compareSync(userPassword, databasePassword);
  },
  encryptPass(password){
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  },
};