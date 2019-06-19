const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/users/signOut', userController.signOut);

router.post('/users/create', userController.create);
router.post('/users/signIn', userController.signIn);

module.exports = router;