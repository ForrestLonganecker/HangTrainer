module.exports = {
  init(server){

    const workoutRoutes = require('../routes/workouts');

    server.use(workoutRoutes);
  }
}