const express = require('express');
const router = express.Router();

const workoutController = require('../controllers/workoutController');

router.get('/workouts', workoutController.index);

module.exports = router;