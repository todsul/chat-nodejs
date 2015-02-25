var React = require('react');

var Dashboard = require('./components/Dashboard');
var MessageActions = require('./actions/MessageActions');
var PageUtility = require('./utilities/PageUtility');
var ProgramActions = require('./actions/ProgramActions');
// var SocketService = require('./services/SocketService');
var styles = require('./styles/dashboard.less');

MessageActions.getMessages();
ProgramActions.getPrograms();

if (PageUtility.areProgramsEditable()) {
    ProgramActions.getProgramOptions();
}

React.render(
    <Dashboard />,
    document.getElementById('dashboard')
);

// SocketService.run();
