const request = require('request');
const server = require('../../server/index');
const base = 'http://localhost:3000/users/';
const User = require('../../src/db/models').User;
const sequelize = require('../../src/db/models/index').sequelize;

describe('routes: users', () => {
  beforeEach((done) => {
    sequelize.sync({force : true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });
  });

  describe('GET /users/sign_up', () => {
    it('should render a view with a sign up form', (done) => {
      expect(err).toBeNull();
      expect(body).toContain('Sign up');
      done();
    });
  });
  
});