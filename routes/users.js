var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var User = mongoose.model('User');

function register(passport) {
    /* GET user dashboard. */
    router.get('/:id', function(req, res) {
      res.send('respond with dashboard');
    });

    /* GET user messages. */
    router.get('/:id/messages', function(req, res) {
        id = req.params.id;

        User.load({criteria: {'_id': id}}, function(err, user) {
            if (err) return res.status(404).send('user not found');

            Message.list({criteria: {user: user}}, function(err, messages) {
                res.send(JSON.stringify(messages));
            });
        });
    });

    /* POST user message. */
    router.post('/:id/messages', function(req, res) {
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

            Message.populate(message, {path: 'user'}, function(err, message) {
                res.status(201).send(JSON.stringify(message));
            });
        });
    });

    return this;
}

module.exports = {register: register, router: function() {return router; }};
