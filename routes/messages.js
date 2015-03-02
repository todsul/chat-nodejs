var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Message = mongoose.model('Message');

function register(passport) {
    router.get('/', function(req, res, next) {
        var options = {};
        Message.list(options, function(err, messages) {
            res.send(JSON.stringify(messages));
        });
    });

    return this;
}

module.exports = {register: register, router: function() {return router; }};
