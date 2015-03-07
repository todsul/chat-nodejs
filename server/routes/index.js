var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');

var parameters = require('../config/parameters');
var User = mongoose.model('User');

function register(app, passport) {
    var assets = JSON.parse(fs.readFileSync(__dirname + '/../config/assets.json', 'utf8'));
    var params = parameters.get(app.get('env'));

    router.get('/', function(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.redirect('/signin');
        }

        // @TODO. Same user for now
        var pageData = {
            clientId: req.user._id,
            userId: req.user._id,
            baseUrl:  params.server.getBaseUrl(),
        };

        res.render('dashboard', {
            pageData: JSON.stringify(pageData),
            scripts: assets['scripts.js'],
            styles: assets['styles.css']
        });
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

module.exports = {register: register, router: function() {return router;}};
