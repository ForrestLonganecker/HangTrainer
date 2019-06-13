const Workout = require('./models').Workout;

module.exports = {
  createWorkout(newWorkout, callback){
    return Workout.create({
      name: newWorkout.name,
      notes: newWorkout.notes,
      userId: newWorkout.userId
    })
    .then((workout) => {
      console.log('{QUERIES.WORKOUT} CREATE WORKOUT: ', workout);
      callback(null, workout);
    })
    .catch((err) => {
      console.log('{QUERIES.WORKOUT} CREATE WORKOUT ERR: ', err);
      callback(err);
    });
  }
}