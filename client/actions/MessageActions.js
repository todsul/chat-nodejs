/* @flow */

var ActionTypes = require('../constants/DashboardConstants').ActionTypes;
var DashboardDispatcher = require('../dispatchers/DashboardDispatcher');
var MessageApi = require('../apis/MessageApi');

function createMessageSuccess(message: string) {
    DashboardDispatcher.handleViewAction({
        type: ActionTypes.CREATE_MESSAGE_SUCCESS,
        message: message
    });
}

function createMessageFailure(error: string) {
    DashboardDispatcher.handleViewAction({
        type: ActionTypes.CREATE_MESSAGE_FAILURE,
        error: error
    });
}

function getMessagesSuccess(messages: string) {
    DashboardDispatcher.handleViewAction({
        type: ActionTypes.GET_MESSAGES_SUCCESS,
        messages: messages
    });
}

function getMessagesFailure(error: string) {
    DashboardDispatcher.handleViewAction({
        type: ActionTypes.GET_MESSAGES_FAILURE,
        error: error
    });
}

var MessageActions = {
    createMessage: function(text: string) {
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
