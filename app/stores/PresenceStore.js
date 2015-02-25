var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var ActionTypes = require('../constants/DashboardConstants').ActionTypes;
var DashboardDispatcher = require('../dispatchers/DashboardDispatcher');
var PageUtility = require('../utilities/PageUtility');

var CHANGE_EVENT = 'change';

var _state = {
    users: []
};

function _handleEvent(event) {
    var userId = PageUtility.extractUserId(event.uuid);
    var status = event.action === 'join' ? 'on' : 'off'; // Off if timeout
    var eventTimestamp = parseInt(event.timestamp, 10);

    if (!_state.users[userId]) {
        _addNew(userId, status, eventTimestamp);
    } else {
        _update(userId, status, eventTimestamp);
    }
}

function _addNew(userId, status, eventTimestamp) {
    _state.users[userId] = {
        userId: userId,
        status: status,
        lastEventTimestamp:
        eventTimestamp,
        timeoutId: null
    };
}

function _update(userId, status, eventTimestamp) {
    var user = _state.users[userId];

    if (eventTimestamp < user.lastEventTimestamp) return;

    user.lastEventTimestamp = eventTimestamp;

    if (status === 'on') {
        _updateOnline(user);
    } else {
        _updateOffline(user);
    }
}

function _updateOnline(user) {
    user.status = 'on';
    clearTimeout(user.timeoutId); // In case a setTimeout is running
    user.timeoutId = null;
}

function _updateOffline(user) {
    if (user.status !== 'on' || user.timeoutId) return;

    user.timeoutId = setTimeout(function() { // To prevent blinking on auto-reconnection
        user.status = 'off';
        user.timeoutId = null;
        PresenceStore.emitEvent(); // TODO: Couldn't find a better way
    }, 5000);
}

var PresenceStore = assign({}, EventEmitter.prototype, {
    emitEvent: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getState: function() {
        return _state;
    }
});

DashboardDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
        case ActionTypes.UPDATE_PRESENCE:
            _handleEvent(action.presence);
            PresenceStore.emitEvent();
            break;

        default:
            // do nothing
    }
});

module.exports = PresenceStore;
