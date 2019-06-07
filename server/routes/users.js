const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// do not need this route handled by frontend but when I remove it it 
// causes Navbar only to lose global styles, it does keep component specific
// files ie: direct imports from within Navbar.js itself
// router.get('/signUp', userController.signUp);
router.get('/users/signOut', userController.signOut);

router.post('/users/create', userController.create);
router.post('/users/signIn', userController.signIn);

module.exports = router;