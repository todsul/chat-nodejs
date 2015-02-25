var express = require('express');
var router = express.Router();

var React = require('react/addons');
var Dashboard = require('../app/components/Dashboard.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    var reactHTML = React.renderToString(Dashboard());
    res.render('index.html', { reactOutput: reactHTML });
});

module.exports = router;
