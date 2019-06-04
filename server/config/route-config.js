// this is where all routes are imported and put in use by the server-side app

module.exports = {
  init(server){

    const workoutRoutes = require('../routes/workouts');
    const userRoutes = require('../routes/users');

    server.use(workoutRoutes);
    server.use(userRoutes);
  }
}