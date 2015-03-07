var PageUtility = require('../utilities/PageUtility');
var MessageActions = require('../actions/MessageActions');
var PresenceActions = require('../actions/PresenceActions');
var SocketAlerts = require('../constants/DashboardConstants').SocketAlerts;

var socketUrl = PageUtility.getBaseUrl();
var handshake =  { query: 'userId=' + PageUtility.getUserId()};
var socket;
var maxReconnectionTries = 10;

function connect() {
    maxReconnectionTries--;
    socket = io.connect(socketUrl, handshake);

    socket.on('dashboard', function(data) {
        maxReconnectionTries = 10;
        notify(data);
    });

    socket.on('disconnect', function() {
        if (maxReconnectionTries <= 0) {
            alert('Yikes. it seems we cannot send you real time notifications. Please contact support@flightfox.com');
            return;
        }

        console.log('disconnected. Trying to reconnect in 3 secs');
        setTimeout(function() {
            socket.io.reconnect();
        }, 3 * 1000);
    });
}


// SocketService
module.exports = function() {
    connect();
};

function notify(data) {
    var type = data.type;

    switch (type) {
        case SocketAlerts.MESSAGES_CHANGE:
            MessageActions.getMessages();
            break;

        case SocketAlerts.PRESENCE_CHANGE:
            PresenceActions.updatePresence(data.event);
            break;

        default:
            // nothing
    }
}
