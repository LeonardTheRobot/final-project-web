const express = require('express');

const router = express.Router();

/* GET system status page */
router.get('/', (_req, res) => {
  res.render('systemStatus');
});

router.get('/order', (_req, res) => {
  res.render('placeOrder');
})

module.exports = router;
