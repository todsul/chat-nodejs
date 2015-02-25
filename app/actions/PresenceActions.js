var ActionTypes = require('../constants/DashboardConstants').ActionTypes;
var DashboardDispatcher = require('../dispatchers/DashboardDispatcher');

var PresenceActions = {
    updatePresence: function(presence) {
        DashboardDispatcher.handleViewAction({
            type: ActionTypes.UPDATE_PRESENCE,
            presence: presence
        });
    }
};

module.exports = PresenceActions;
