const express = require('express');
const router = express.Router();

const workoutController = require('../controllers/workoutController');

router.get('/workouts/myWorkouts', workoutController.getMyWorkouts);

router.post('/workouts/create', workoutController.create);
router.post('/workouts/delete', workoutController.delete);
router.post('/workouts/update', workoutController.update);

module.exports = router;