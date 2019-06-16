const workoutQueries = require('../db/queries.workouts.js');

module.exports = {
  index(req, res){
    res.send('Work it!! from the express server!');
  },
  getMyWorkouts(req, res){
    workoutQueries.getAllOwn(req.user.id, (err, workouts) => {
      if(err){
        console.log('{WORKOUT CONTROLLER} if/err: ', err);
        err.statusCode = 400;
        res.send(err);
      } else {
        console.log('{WORKOUT CONTROLLER} ELSE GET/SUCCESS: ', workouts);
        res.send(workouts);
      }
    });
  },
  create(req, res){

    let newWorkout = {
      name: req.body.name,
      notes: req.body.notes,
      userId: req.user.id
    };

    console.log('{WORKOUT-CONTROLLER} CREATE NEWWORKOUT: ', newWorkout);

    workoutQueries.create(newWorkout, (err, workout) => {
      if(err){
        console.log("{WORKOUT-CONTROLLER} CREATE IF/ERR: ", err);
        
        err.statusCode = 400;
        res.send(err);
      } else {
        console.log("{WORKOUT-CONTROLLER} CREATE ELSE/WORKOUT: ", workout.dataValues);
        res.send(workout);
      }
    });
  },
  delete(req, res){
    console.log('{WORKOUT CONTROLLER} REQ.BODY', req.body);
    if(req.user){
      const options = {
        workoutId: req.body.key,
        userId: req.user.id
      };
      console.log('{WORKOUT CONTROLLER} DELETE OPTIONS', options);
      
      workoutQueries.destroy(options, (err, deletedWorkout) => {
        if(err){
          console.log('{WORKOUT CONTROLLER} DELETE IF/ERR', err);
          err.statusCode = 400;
          res.send(err);
        } else {
          console.log('{WORKOUT CONTROLLER} DELETE SUCCESS: ', deletedWorkout);
          res.send(deletedWorkout);
        }
      });
    } else {
      console.log('{WORKOUT CONTROLLER} NO REQ USER');
      let err;
      err.statusCode = 400;
      res.send(err);
    }
  },
};