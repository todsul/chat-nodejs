var express = require('express');
var router = express.Router();
var React = require('react/addons');
var Dashboard = React.createFactory(require('../app/components/Dashboard.js'));

// helper function for rendering a view with React
function reactRender(view, res, componentClass) {
    var component = new componentClass();
    var reactHTML = React.renderToString(component);
    res.render(view, { reactOutput: reactHTML });
}

/* GET home page. */
router.get('/', function(req, res, next) {
    // var reactHTML = React.renderToString(Dashboard());
    //res.render('index.html', { reactOutput: reactHTML });
    reactRender('dashboard', res, Dashboard);
});

module.exports = router;
