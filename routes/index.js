var express = require('express');
var router = express.Router();
var React = require('react/addons');
var Dashboard = React.createFactory(require('../app/components/Dashboard.js'));

// helper function for rendering a view with React
function reactToString(componentClass) {
    var component = new componentClass();
    return React.renderToString(component);

}

/* GET home page. */
router.get('/', function(req, res, next) {
    var markup = reactToString(Dashboard);
    res.send('<!doctype html>\n' + markup);
});

module.exports = router;
