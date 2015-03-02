var ActionTypes = require('../constants/DashboardConstants').ActionTypes;
var DashboardDispatcher = require('../dispatchers/DashboardDispatcher');
var MessageApi = require('../apis/MessageApi');
var PageUtility = require('../utilities/PageUtility');

function createMessageSuccess(message) {
    DashboardDispatcher.handleViewAction({
        type: ActionTypes.CREATE_MESSAGE_SUCCESS,
        message: message
    });
}

function createMessageFailure(error) {
    DashboardDispatcher.handleViewAction({
        type: ActionTypes.CREATE_MESSAGE_FAILURE,
        error: error
    });
}

function getMessagesSuccess(messages) {
    DashboardDispatcher.handleViewAction({
        type: ActionTypes.GET_MESSAGES_SUCCESS,
        messages: messages
    });
}

function getMessagesFailure(error) {
    DashboardDispatcher.handleViewAction({
        type: ActionTypes.GET_MESSAGES_FAILURE,
        error: error
    });
}

var MessageActions = {
    createMessage: function(text) {
        DashboardDispatcher.handleViewAction({
            type: ActionTypes.CREATE_MESSAGE,
            text: text
        });

        MessageApi.createMessage(text, createMessageSuccess, createMessageFailure);
    },

    getMessages: function() {
        DashboardDispatcher.handleViewAction({
            type: ActionTypes.GET_MESSAGES
        });

        MessageApi.getMessages(getMessagesSuccess, getMessagesFailure);
    }
};

module.exports = MessageActions;
