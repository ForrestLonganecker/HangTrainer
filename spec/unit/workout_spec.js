const sequelize = require('../../server/db/models/index').sequelize;
const Workout = require('../../server/db/models').Workout;
const User = require('../../server/db/models').User;

describe('Workout', () => {

  beforeEach((done) => {
    sequelize.sync({force: true})
    .then(() => {
      this.user;

      User.create({
        email: 'rock@climb.com',
        password: '123456'
      })
      .then((user) => {
        this.user = user;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    })
    .catch((err) => {
      console.log(err);
      done();
    });
  });

  describe('#create()', () => {
    it('should create a workout object with assigned name, and notes', (done) => {
      Workout.create({
        name: 'Easy',
        notes: 'For high-gravity days',
        userId: this.user.id
      })
      .then((workout) => {
        expect(workout.name).toBe('Easy');
        expect(workout.notes).toBe('For high-gravity days');
        expect(workout.userId).toBe(this.user.id);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

});