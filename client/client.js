var React = require('react');

var Dashboard = require('./components/Dashboard');
var MessageActions = require('./actions/MessageActions');
var SocketService = require('./services/SocketService');

MessageActions.getMessages();

React.render(
    <Dashboard />,
    document.getElementById('dashboard')
);

SocketService();
