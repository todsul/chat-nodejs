/* @flow */

var MessageActions = require('../actions/MessageActions');
var PageUtility = require('./PageUtility');
var PresenceActions = require('../actions/PresenceActions');
var Socket = require('../lib/socket');
var SocketAlerts = require('../constants/DashboardConstants').SocketAlerts;

var subscribed = false;
var userId = parseInt(PageUtility.getUserId(), 10);

function onMessageReceived(message) {
    var type = message.type;
    console.log('socket', message);

    switch (type) {
        case SocketAlerts.MESSAGES_CHANGE:
            MessageActions.getMessages();
            break;

        default:
            // nothing
    }
}

function onPresence(presence) {
    PresenceActions.updatePresence(presence);
}

module.exports = function() {
    if (subscribed) { return; }

    subscribed = true;
    var channel = PageUtility.getPageSocketChannel();
    var subscribeKey = PageUtility.getFlightfoxPubnubSubscribeKey();

    Socket.initialize(userId, subscribeKey);
    Socket.subscribe(channel, onMessageReceived, onPresence);
};
