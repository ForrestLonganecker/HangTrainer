const request = require('request');
const server = require('../../server/index');
const base = 'http://localhost:3000/users/';
const User = require('../../server/db/models').User;
const sequelize = require('../../server/db/models/index').sequelize;

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

  describe('GET /signUp', () => {
    it('should render a view with a sign up form', (done) => {
      request.get(`http://localhost:3000/signUp`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('Sign up');
        done();
      });
    });
  });

  describe('POST /users/create', () => {
    it('should create a new user with valid values and redirect', (done) => {
      const options = {
        url: `${base}create`,
        form: {
          email: 'strong@grips.com',
          password: '123456'
        }
      }

      request.post(options, (err, res, body) => {
        User.findOne({where: {email: 'strong@grips.com'}})
        .then((user) => {
          expect(user).not.toBeNull();
          expect(user.email).toBe('strong@grips.com');
          expect(user.id).toBe(1);
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });
  });

  it('should not create a new user with invalid attributes and redirect', (done) => {
    request.post(
      {
        url: `${base}create`,
        form: {
          email: 'none',
          password: '123456'
        }
      },
      (err, res, body) => {
        User.findOne({where: {email: 'no'}})
        .then((user) => {
          expect(user).toBeNull();
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      }
    );
  });

});