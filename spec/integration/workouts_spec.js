const request = require('request');
const server = require('../../server/index');
const base = 'http://localhost:3000/workouts';

describe('routes : workouts', () => {

  beforeEach((done) => {
    this.user;

    sequelize.sync({force: true})
    .then(() => {
      User.create({
        email: 'rocky@limber.com',
        password: '123456'
      })
      .then((user) => {
        this.user = user;
        done();
      })
      .catch((err) => {
        console.log(err);
      });
    }) 
    .catch((err) => {
      console.log(err);
    });
  });

  describe('GET /workouts', () => {
    it('should return status code 200, and contain "HangTrainer"', (done) => {
      request.get(base, (err, res, body) => {
        console.log(res);
        expect(res.statusCode).toBe(200);
        expect(body).toContain('HangTrainer');
        done();
      });
    });
  });

  describe('POST /workouts/create', () => {
    it('should create a workout with the assigned user, name, description', (done) => {
      const options = {
        url: `${base}create`,
        form: {

        }
      }

      request.post(options, (err, res, body) => {
        Workout.findOne({ where: {id: 1}})
        .then((workout) => {
          expect(err).toBeNull();
          expect(workout.userId).toBe(this.user.id)
        })
        .catch((err) => {
          console.log(err);
        })
      })
    })
  })

});