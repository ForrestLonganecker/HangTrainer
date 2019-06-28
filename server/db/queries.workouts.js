const Workout = require('./models').Workout;

module.exports = {
  create(newWorkout, callback){
    return Workout.create({
      name: newWorkout.name,
      notes: newWorkout.notes,
      userId: newWorkout.userId
    })
    .then((workout) => {
      callback(null, workout);
    })
    .catch((err) => {
      callback(err);
    });
  },
  getAllOwn(userId, callback){
    return Workout.findAll({where: {userId: userId}})
    .then((workouts) => {
      callback(null, workouts);
    })
    .catch((err) => {
      callback(err);
    });
  },
  destroy(options, callback){
    return Workout.findByPk(options.workoutId)
    .then((workout) => {

      if(workout.userId === options.userId){
        workout.destroy()
        .then(() => {
          callback(null, workout);
        })
        .catch((err) => {
          callback(err);
        });
      } else {
        callback(401);
      }
    })
    .catch((err) => {
      callback(err);
    });
  },
  update(options, callback){
    return Workout.findByPk(options.workoutId)
    .then((workout) => {
      if(workout.userId === options.userId){
        Workout.update({
          name: options.updatedName,
          notes: options.updatedNotes
        }, 
          {where: {id: options.workoutId}}
        )
        .then((updatedWorkout) => {
          callback(null, updatedWorkout);
        })
        .catch((err) => {
          callback(err);
        });
      } else {
        callback(401);
      }
    });
  },
};