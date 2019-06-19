const Workout = require('./models').Workout;

module.exports = {
  create(newWorkout, callback){
    return Workout.create({
      name: newWorkout.name,
      notes: newWorkout.notes,
      userId: newWorkout.userId
    })
    .then((workout) => {
      // console.log('{QUERIES.WORKOUT} CREATE WORKOUT: ', workout.dataValues);
      callback(null, workout);
    })
    .catch((err) => {
      // console.log('{QUERIES.WORKOUT} CREATE WORKOUT ERR: ', err);
      callback(err);
    });
  },
  getAllOwn(userId, callback){
    return Workout.findAll({where: {userId: userId}})
    .then((workouts) => {
      // console.log('{QUERIES.WORKOUT} FOUND WORKOUTS: ', workouts);
      callback(null, workouts);
    })
    .catch((err) => {
      // console.log('{QUERIES.WORKOUT} GETALL WORKOUTS ERROR: ', err);
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
      console.log('{QUERY WORKOUTS} THEN WORKOUT: ', workout);
      if(workout.userId === options.userId){
        Workout.update({
          name: options.updatedName,
          notes: options.updatedNotes
        }, 
          {where: {id: options.workoutId}}
        )
        .then((updatedWorkout) => {
          console.log('{QUERY WORKOUTS} UPDATED WORKOUT: ', updatedWorkout);
          callback(null, updatedWorkout);
        })
        .catch((err) => {
          console.log('{QUERY WORKOUTS} ERR WHILE UPDATING WORKOUT: ', err);
          callback(err);
        });
      } else {
        console.log('{QUERY WORKOUTS} WORKOUT NOT FOUND');
        callback(401);
      }
    });
  },
};