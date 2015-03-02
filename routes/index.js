var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

function register(app, passport) {
    router.get('/', function(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.redirect('/signin');
        }

        // @TODO. Same user for now
        var pageData = {
            clientId: req.user._id,
            userId: req.user._id
        };

        res.render('dashboard', {pageData: JSON.stringify(pageData)});
    });

    router.get('/signin', function(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/');
        }

        res.render('signin');
    });

    router.post('/signin',
        passport.authenticate('local', {
            failureRedirect: '/signin',
            failureFlash: true
        }),
        function(req, res, next) {
            res.redirect('/');
        }
    );

    router.get('/signout', function(req, res, next) {
        req.logOut();
        res.redirect('/signin');
    });

    return this;
}

module.exports = {register: register, router: function() {return router; }};
