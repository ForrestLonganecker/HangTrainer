const express = require('express');
const router = express.Router();

router.get('/workouts', (req, res) => {
  return res.end('Work it!! from the express server!')
});

module.exports = router;