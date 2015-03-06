var PageUtility = require('../utilities/PageUtility');
var MessageActions = require('../actions/MessageActions');
var PresenceActions = require('../actions/PresenceActions');
var SocketAlerts = require('../constants/DashboardConstants').SocketAlerts;

// SocketService
module.exports = function() {
    var channel = io.connect(PageUtility.getBaseUrl(), { query: 'userId=' + PageUtility.getUserId()});

    channel.on('dashboard', function(data) {
        notify(data);
    });

    console.log('listening on disconnect');
    channel.on('disconnect', function() {
        console.log('boo, got disconnected');
    });
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
