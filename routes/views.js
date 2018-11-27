const express = require('express');

const router = express.Router();

/* GET system status page */
router.get('/', (_req, res) => {
  res.render('systemStatus');
});

module.exports = router;
