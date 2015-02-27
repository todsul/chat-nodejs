var express = require('express');
var router = express.Router();
var React = require('react/addons');

var Dashboard =require('../views/Dashboard.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('<!doctype html>\n' + Dashboard);
});

module.exports = router;
