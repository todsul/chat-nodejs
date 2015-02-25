var express = require('express');
var router = express.Router();
var React = require('react/addons');
var DashboardServer =require('../app/DashboardServer.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('<!doctype html>\n' + DashboardServer.toString());
});

module.exports = router;
