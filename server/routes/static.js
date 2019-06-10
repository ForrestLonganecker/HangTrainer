const express = require('express');
const router = express.Router();

const staticController = require('../controllers/staticController');

router.get('/static/index', staticController.index);


module.exports = router;