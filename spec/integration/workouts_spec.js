const request = require('request');
const server = require('../../server/index');
const base = 'http://localhost:3000/workouts';
const sequelize = require('../../server/db/models/index').sequelize;
const User = require('../../server/db/models/').User;
const Workout = require('../../server/db/models/').Workout;

describe('routes : workouts', () => {

  beforeEach((done) => {
    this.user;
    this.workout;

    sequelize.sync({force: true})
    .then(() => {
      User.create({
        email: 'rocky@limber.com',
        password: '123456'
      })
      .then((user) => {
        this.user = user;

        Workout.create({
          name: 'Easy',
          notes: 'Good starter workout',
          userId: this.user.id
        })
        .then((workout) => {
          this.workout = workout;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        })
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
    fit('should return status code 200, and contain "HangTrainer"', (done) => {
      request.get(base, (err, res, body) => {
        console.log(res);
        // expect(res).toBe(200);
        expect(body).toContain('HangTrainer');
        expect(err).toBeNull();
        console.log(err);
        done();
      });
    });
  });

  describe('POST /workouts/create', () => {
    it('should create a workout with the assigned user, name, description', (done) => {
      const options = {
        url: `${base}create`,
        form: {
          name: 'Medium',
          notes: 'Warm up those tendons before this one!',
          userId: this.user.id
        }
      }

      request.post(options, (err, res, body) => {
        Workout.findOne({ where: {name: 'Medium'}})
        .then((workout) => {
          expect(err).toBeNull();
          expect(workout.userId).toBe(this.user.id);
          expect(workout.notes).toContain('Warm up those tendons');
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        })
      })
    })
  })

});