var React = require('react');

var Layout = require('./components/Layout');
var LayoutHead = require('./components/LayoutHead');
var LayoutBody = require('./components/LayoutBody');

var MessageActions = require('./actions/MessageActions');
var PageUtility = require('./utilities/PageUtility');
var ProgramActions = require('./actions/ProgramActions');

/* Instead of these calls, we can do a Mongo fetch and do something linke MessageActions.receiveMessages(Message.findAll());
    though not sure how that will work with renderToString();
*/
//MessageActions.getMessages();
//ProgramActions.getPrograms();

if (PageUtility.areProgramsEditable()) {
    ProgramActions.getProgramOptions();
}

var Page = React.createClass({
    render: function() {
        return (
            <Layout>
                <LayoutHead
                    canonical={'https://flightfox.com/dashboard'}
                    title={'Dashboard'} />
                <LayoutBody bundleFile={'/public/js/dashboard.bundle.js'}>
                    __content__
                </LayoutBody>
            </Layout>
        );
    }
});

function reactToString(componentClass) {
    var component = new componentClass();
    return React.renderToString(component);
}

var PageFactory = React.createFactory(Page);
var DashboardFactory = React.createFactory(require('./components/Dashboard'));

var pageMarkup = reactToString(PageFactory);
var dashboardMarkup = reactToString(DashboardFactory);

module.exports = {
    toString: function() {
        return pageMarkup.replace(/__content__/, dashboardMarkup);
    }
}



