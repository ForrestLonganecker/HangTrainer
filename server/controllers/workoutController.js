const workoutQueries = require('../db/queries.workouts.js');

module.exports = {
  index(req, res, next){
    // when I change this to 'send' from 'end' Navbar.js does not register styling
    return res.send('Work it!! from the express server!')
  },
  create(req, res, next){

    let newWorkout = {
      name: req.body.name,
      notes: req.body.notes,
      userId: req.user.id
    };

    console.log('{WORKOUT-CONTROLLER} CREATE NEWWORKOUT: ', newWorkout);

    workoutQueries.create(newWorkout, (err, workout) => {
      if(err){
        console.log("{WORKOUT-CONTROLLER} CREATE IF/ERR: ", err)
        
        err.statusCode = 400;
        res.send(err);
      } else {
        console.log("{WORKOUT-CONTROLLER} CREATE ELSE/WORKOUT: ", workout.dataValues)
        res.send(workout);
      }
    })
  },
}