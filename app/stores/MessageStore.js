var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var ActionTypes = require('../constants/DashboardConstants').ActionTypes;
var DashboardDispatcher = require('../dispatchers/DashboardDispatcher');
var PageUtility = require('../utilities/PageUtility');

var LIST_CHANGE_EVENT = 'list';
var FORM_CHANGE_EVENT = 'form';

var _state = {
    all: false,
    loading: false,
    processing: false,
    messages: [],
    text: ''
};

function _onCreateMessage(text) {
    _state.processing = true;
    _state.text = text;
}

function _onCreateMessageFailure(error) {
    if (error) alert(error);
    _state.processing = false;
}

function _onCreateMessageSuccess(message) {
    _state.all = false;
    MessageStore.emitEvent(FORM_CHANGE_EVENT);
    _state.messages.unshift(message);
    _state.processing = false;
    _state.text = '';
    PageUtility.resetMessageCountMultiplier();
}

function _onGetMessages() {
    _state.loading = true;
}

function _onGetMessagesFailure(error) {
    if (error) alert(error);
    _state.loading = false;
}

function _onGetMessagesSuccess(messages) {
    _state.all = PageUtility.getMessageCount() > messages.length ? true : false;
    _state.loading = false;
    _state.messages = messages;
}

var MessageStore = assign({}, EventEmitter.prototype, {
    emitEvent: function(event) {
        this.emit(event);
    },

    addListener: function(event, callback) {
        this.on(event, callback);
    },

    removeListener: function(event, callback) {
        this.removeListener(event, callback);
    },

    getState: function() {
        return _state;
    },

    getUnreadCount: function() {
        var userId = PageUtility.getUserId();
        var count = 0;

        for (var i = 0; i < _state.messages.length; i++) {
            if (parseInt(_state.messages[i].owner_id, 10) !== parseInt(userId, 10)) {
                count++;
            } else {
                break;
            }
        }

        // Max 9 for UI design
        return count < 10 ? count : 9;
    }
});

DashboardDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
        case ActionTypes.CREATE_MESSAGE:
            _onCreateMessage(action.text);
            MessageStore.emitEvent(FORM_CHANGE_EVENT);
            break;

        case ActionTypes.CREATE_MESSAGE_FAILURE:
            _onCreateMessageFailure(action.error);
            MessageStore.emitEvent(FORM_CHANGE_EVENT);
            break;

        case ActionTypes.CREATE_MESSAGE_SUCCESS:
            _onCreateMessageSuccess(action.message);
            MessageStore.emitEvent(FORM_CHANGE_EVENT);
            MessageStore.emitEvent(LIST_CHANGE_EVENT);
            break;

        case ActionTypes.GET_MESSAGES:
            _onGetMessages();
            MessageStore.emitEvent(LIST_CHANGE_EVENT);
            break;

        case ActionTypes.GET_MESSAGES_FAILURE:
            _onGetMessagesFailure(action.error);
            MessageStore.emitEvent(LIST_CHANGE_EVENT);
            break;

        case ActionTypes.GET_MESSAGES_SUCCESS:
            _onGetMessagesSuccess(action.messages);
            MessageStore.emitEvent(LIST_CHANGE_EVENT);
            break;

        default:
            // do nothing
    }
});

module.exports = MessageStore;
