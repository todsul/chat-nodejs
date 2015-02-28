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

module.exports = router;
