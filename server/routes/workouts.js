const express = require('express');
const router = express.Router();

router.get('/workouts', (req, res) => {
  return res.end('Work it!!')
});

module.exports = router;