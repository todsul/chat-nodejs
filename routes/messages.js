var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Message = mongoose.model('Message');

router.get('/', function(req, res, next) {
    var options = {};
    Message.list(options, function(err, messages) {
        res.send(JSON.stringify(messages));
    });
});

module.exports = router;
