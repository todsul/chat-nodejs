var React = require('react');

var Dashboard = require('./components/Dashboard');
var MessageActions = require('./actions/MessageActions');
var PageUtility = require('./utilities/PageUtility');
// var SocketService = require('./services/SocketService');

MessageActions.getMessages();

React.render(
    <Dashboard />,
    document.getElementById('dashboard')
);


var channel = io.connect('http://localhost:3000/sockets/dashboard');
channel.on('DASHBOARD_CHANGE', function(data) {
    console.log('Dashboard change received');
    console.log(data);
});

// channel.on('connect', function(socket) {
//     console.log('Connected!');
// });
//io.on('message', MessageActions.getMessages);


// SocketService.run();
