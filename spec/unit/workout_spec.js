const sequelize = require('../../server/db/models/index').sequelize;
const Workout = require('../../server/db/models').Workout;

describe('Workout', () => {

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
    it('should create a workout object with assigned name, and notes', (done) => {
      Workout.create({
        name: 'Easy',
        notes: 'For high-gravity days'
      })
      .then((workout) => {
        expect(workout.name).toBe('Easy');
        expect(workout.notes).toBe('For high-gravity days');
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

});