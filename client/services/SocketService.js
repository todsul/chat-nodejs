var MessageActions = require('../actions/MessageActions');
var PageConfig = require('../config/PageConfig');
var PresenceActions = require('../actions/PresenceActions');
var SocketAlerts = require('../constants/DashboardConstants').SocketAlerts;

var socketUrl = PageConfig.getBaseUrl();
var handshake =  { query: 'userId=' + PageConfig.getUserId(), forceNew: true};
var socket;

function connect() {
    socket = io.connect(socketUrl, handshake);

    socket.on('dashboard', function(data) {
        maxReconnectionTries = 10;
        notify(data);
    });

    socket.on('disconnect', function() {
        setTimeout(function() {
            socket.connect();
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
