/* @flow */

var assign = require('object-assign');
var Dispatcher = require('flux').Dispatcher;

var PayloadSources = require('../constants/DashboardConstants').PayloadSources;

var DashboardDispatcher = assign(new Dispatcher(), {
    handleViewAction: function(action) {
        console.log('action', action);
        this.dispatch({
            source: PayloadSources.VIEW_MESSAGES,
            action: action
        });
    }
});

module.exports = DashboardDispatcher;
