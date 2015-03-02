var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

/* GET home page. */
router.get('/', function(req, res, next) {
    User.find().limit(1).exec(function(err, users) {
        var user = users.shift();

        var pageData = {
            clientId: user._id,
            userId: req.user._id
        };

        res.render('dashboard', {pageData: JSON.stringify(pageData)});
    });
});

// @TODO redirect to dashboard if user is in session for routes below

router.get('/signin', function(req, res, next) {
    res.render('signin');
});

router.post('/signin', function(req, res, next) {
    User.load({criteria: {email: req.body.email, password: req.body.password}}, function(err, user) {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(400).send('User not found');

        res.send('Welcome ' + user.email);
    });
});

module.exports = router;
