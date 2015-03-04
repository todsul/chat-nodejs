/* @flow */

var ActionTypes = require('../constants/DashboardConstants').ActionTypes;
var DashboardDispatcher = require('../dispatchers/DashboardDispatcher');

var PresenceActions = {
    updatePresence: function(event: string) {
        DashboardDispatcher.handleViewAction({
            type: ActionTypes.UPDATE_PRESENCE,
            event: event
        });
    }
};

module.exports = PresenceActions;
