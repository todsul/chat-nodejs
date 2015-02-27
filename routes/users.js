var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var User = mongoose.model('User');

/* GET user dashboard. */
router.get('/:id', function(req, res) {
  res.send('respond with dashboard');
});

/* GET user messages. */
router.get('/:id/messages', function(req, res) {
    userId = req.params.id;

    User.load({criteria: {'_id': userId}}, function(err, user) {
        if (err) return res.status(404).send('user not found');

        Message.list({criteria: {user: user}}, function(err, messages) {
            res.send(JSON.stringify(messages));
        });
    });
});

/* Post user message. */
router.post('/:id/messages', function(req, res) {
  res.send('respond with a message');
});

module.exports = router;
