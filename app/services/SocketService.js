// OLD CODE FOR lib/socket.js

var PageUtility = require('../utilities/PageUtility');
var MessageActions = require('../actions/MessageActions');
var SocketAlerts = require('../constants/DashboardConstants').SocketAlerts;

// SocketService
module.exports = function() {
    var channel = io.connect(PageUtility.getBaseUrl(), { query: 'userId=' + PageUtility.getUserId()});

    channel.on('dashboard', function(data) {
        notify(data);
    });
};

function notify(data) {
    var type = data.type;
    console.log('socket: ' + JSON.stringify(data));

    switch (type) {
        case SocketAlerts.MESSAGES_CHANGE:
            MessageActions.getMessages();
            break;

        case SocketAlerts.PRESENCE_CHANGE:
            console.log(data);
            break;

        default:
            // nothing
    }
}
