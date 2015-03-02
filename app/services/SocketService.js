// OLD CODE FOR lib/socket.js

var PageUtility = require('../utilities/PageUtility');
var MessageActions = require('../actions/MessageActions');
var SocketAlerts = require('../constants/DashboardConstants').SocketAlerts;

// SocketService
module.exports = function() {
    var channel = io.connect();
    channel.on('dashboard', function(data) {
        onMessageReceived(data);
    });
};

function onMessageReceived(data) {
    var type = data.type;
    console.log('socket: ' + JSON.stringify(data));

    switch (type) {
        case SocketAlerts.MESSAGES_CHANGE:
            MessageActions.getMessages();
            break;

        default:
            // nothing
    }
}
