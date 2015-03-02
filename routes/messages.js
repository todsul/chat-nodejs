var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Message = mongoose.model('Message');

function register(app, passport) {
    router.get('/', function(req, res, next) {
        var options = {};
        Message.list(options, function(err, messages) {
            res.send(JSON.stringify(messages));
        });
    });

    router.post('/', function(req, res) {
        var sessionUser = req.user;

        if (!sessionUser) {
            res.status(403).send('A session user is required');
        }

        var data = req.body;

        if (!data.text) {
            res.status(500).send('Invalid request body. ' + err);
        }

        var message = new Message({
            text: data.text,
            created: new Date(),
            user: sessionUser
        });

        message.save(function(err, message) {
            if (err) {
                res.status(500).send(err);
            }

            app.IOConnection.emit('dashboard', { type:'MESSAGES_CHANGE', message: 'The messages list for this client has changed'});

            Message.populate(message, {path: 'user'}, function(err, message) {
                res.status(201).send(JSON.stringify(message));
            });
        });
    });

    return this;
}

module.exports = {register: register, router: function() {return router; }};
