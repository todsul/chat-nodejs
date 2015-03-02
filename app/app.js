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
// @TODO get event hashed in order to implement private channels;
channel.on('DASHBOARD_CHANGE_CLIENT_1', function(data) {
    console.log('Dashboard change received');
    console.log(data);
    MessageActions.getMessages();
});

// channel.on('connect', function(socket) {
//     console.log('Connected!');
// });
//io.on('message', MessageActions.getMessages);


// SocketService.run();
