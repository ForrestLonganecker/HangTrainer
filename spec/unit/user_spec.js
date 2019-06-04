const sequelize = require('../../server/db/models/index').sequelize;
const User = require('../../server/db/models').User;

describe('User', () => {

  beforeEach((done) => {
    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });
  });

  describe('#create()', () => {
    it('should create a User object with valid email and password', (done) => {
      User.create({
        email: 'strong@grips.com',
        password: '123456'
      })
      .then((user) => {
        expect(user.email).toBe('strong@grips.com');
        expect(user.id).toBe(1);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it('should not create a user with invalid email', (done) => {
      User.create({
        email: 'as if I care @ you.com',
        password: '123456'        
      })
      .then((user) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain('Validation error: must be a valid email');
        done();
      })
    })
    
    it('should not create a user with invalid password', (done) => {
      User.create({
        email: 'strong@grips.com',
        password: 'q'        
      })
      .then((user) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain('Validation error: must be a valid password');
        done();
      });    
    });

    it('should not create a user with an email already taken', (done) => {
      User.create({
        email: 'strong@grips.com',
        password: '123456'        
      })
      .then((user) => {
        User.create({
          email: 'strong@grips.com',
          password: '123456'        
        })
        .then((user) => {
          done();
        })
        .catch((err) => {
          expect(err.message).toContain('Validation error');
          done();
        });    
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

});