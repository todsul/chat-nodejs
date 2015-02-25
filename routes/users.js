var express = require('express');
var router = express.Router();

/* GET user dashboard. */
router.get('/:id', function(req, res) {
  res.send('respond with dashboard');
});

/* GET user messages. */
router.get('/:id/messages', function(req, res) {
  res.send('respond with messages');
});

/* Post user message. */
router.post('/:id/messages', function(req, res) {
  res.send('respond with a message');
});

module.exports = router;
