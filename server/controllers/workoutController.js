const workoutQueries = require('../db/queries.workouts.js');

module.exports = {
  getMyWorkouts(req, res){
    if(req.user){
      workoutQueries.getAllOwn(req.user.id, (err, workouts) => {
        if(err){
          err.statusCode = 400;
          res.send(err);
        } else {
          let data = {
            workouts: workouts,
            isAuthenticated: true
          };
          res.send(data);
        }
      });
    } else {
      let err = {statusCode: 400};
      res.send(err);
    }
  },
  create(req, res){

    let newWorkout = {
      name: req.body.name,
      notes: req.body.notes,
      userId: req.user.id
    };

    workoutQueries.create(newWorkout, (err, workout) => {
      if(err){        
        err.statusCode = 400;
        res.send(err);
      } else {
        res.send(workout);
      }
    });
  },
  delete(req, res){
    if(req.user){
      const options = {
        workoutId: req.body.key,
        userId: req.user.id
      };
      
      workoutQueries.destroy(options, (err, deletedWorkout) => {
        if(err){
          err.statusCode = 400;
          res.send(err);
        } else {
          res.send(deletedWorkout);
        }
      });
    } else {
      let err;
      err.statusCode = 400;
      res.send(err);
    }
  },
  update(req, res){
    if(req.user){
      const options = {
        userId: req.user.id,
        workoutId: req.body.workoutId,
        updatedName: req.body.updatedName,
        updatedNotes: req.body.updatedNotes,
      };
      workoutQueries.update(options, (err, updatedWorkout) => {
        if(err){
          err.statusCode = 400;
          res.send(err);
        } else {
          res.send(updatedWorkout);
        }
      });
    } else {
      let err;
      err.statusCode = 400;
      res.send(err);
    }
  },
};