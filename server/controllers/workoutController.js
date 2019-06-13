const workoutQueries = require('../db/queries.workouts.js');

module.exports = {
  index(req, res, next){
    // when I change this to 'send' from 'end' Navbar.js does not register styling
    return res.send('Work it!! from the express server!')
  },
  create(req, res, next){
    console.log('{WORKOUT-CONTROLLER} CREATE REQ.USER: ', req.user);

    let newWorkout = {
      name: req.body.name,
      userId: req.user.id
    };

    // append optional notes
    if(req.body.notes) newWorkout.notes = req.body.notes;

    workoutQueries.create(newWorkout, (err, workout) => {
      if(err){
        console.log("{WORKOUT-CONTROLLER} CREATE IF/ERR: ", err)
        
        err.statusCode = 400;
        res.send(err);
      } else {
        console.log("{WORKOUT-CONTROLLER} CREATE ELSE/WORKOUT: ", workout)
        res.send(workout);
      }
    })
  },
}