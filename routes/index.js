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
            userId: 1 // TODO get session user
        };

        pageData = JSON.stringify(pageData);

        res.render('dashboard', {pageData: pageData});
        });
});

module.exports = router;
