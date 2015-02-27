var React = require('react');

var Layout = require('./components/Layout');

var Dashboard = React.createClass({
    render: function() {
        return (
            <Layout canonical={'https://flightfox.com/dashboard'} title={'Dashboard'}>
                <div id="dashboard"></div>
            </Layout>
        );
    }
});

function reactToString(componentClass) {
    var component = new componentClass();
    return React.renderToString(component);
}

var DashboardFactory = React.createFactory(Dashboard);
var DashboardString = reactToString(DashboardFactory);

module.exports = DashboardString;
