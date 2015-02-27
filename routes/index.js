var express = require('express');
var router = express.Router();
var React = require('react/addons');

var Dashboard = require('../app/components/Dashboard.js');

// FOR SSR - JUST UNCOMMENT
var DashboardString = '';
// var DashboardFactory = React.createFactory(Dashboard);
// var DashboardString = React.renderToString(DashboardFactory());

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('dashboard', { body: DashboardString });
});

module.exports = router;
