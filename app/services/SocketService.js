// OLD CODE FOR lib/socket.js

var PageUtility = require('../utilities/PageUtility');
var MessageActions = require('../actions/MessageActions');
var PresenceActions = require('../actions/PresenceActions');
var SocketAlerts = require('../constants/DashboardConstants').SocketAlerts;

// SocketService
module.exports = {
    run: function() {
        if (!initialized) {
            initialize();
        }
    }
};

// Initialization

var initialized = false,
    pubnubConnection;

function initialize() {
    initialized = true;
    requirePUBNUB();
    connect();
    subscribe();
}

function requirePUBNUB() {
    require('../lib/pubnub'); // Not assigned to a var since it's not a module. Also we don't want it to run multiple times, that's why it should be called at this level.
}

function connect() {
    var userId = PageUtility.getUserId();
    var uuid = PageUtility.generateUUID(userId);
    var subscribeKey = PageUtility.getFlightfoxPubnubSubscribeKey();

    pubnubConnection = PUBNUB.init({
        uuid: uuid,
        ssl: true,
        subscribe_key: subscribeKey
    });
}

function subscribe() {
    var channel = PageUtility.getPageSocketChannel();

    pubnubConnection.subscribe({
        channel: channel,
        message: onMessageReceived,
        presence: onPresence
    });
}

// Register actions.

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
