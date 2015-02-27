var express = require('express');
var router = express.Router();
var React = require('react/addons');

var Dashboard = require('../app/components/Dashboard.js');

// FOR SSR - set to TRUE then re-run 'npm run-script debug'
var ssr = false;

var DashboardFactory = React.createFactory(Dashboard);
var DashboardString = ssr ? React.renderToString(DashboardFactory()) : '';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('dashboard', { body: DashboardString });
});

module.exports = router;
