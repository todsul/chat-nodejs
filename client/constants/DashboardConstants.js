var keyMirror = require('keymirror');

module.exports = {
    ActionTypes: keyMirror({

        // MESSAGE

        CREATE_MESSAGE: null,
        CREATE_MESSAGE_FAILURE: null,
        CREATE_MESSAGE_SUCCESS: null,

        GET_MESSAGES: null,
        GET_MESSAGES_FAILURE: null,
        GET_MESSAGES_SUCCESS: null,

        // PRESENCE

        UPDATE_PRESENCE: null
    }),

    SocketAlerts: keyMirror({
        MESSAGES_CHANGE: null,
        PRESENCE_CHANGE: null,
    }),

    PayloadSources: keyMirror({
        VIEW_ACTION: null
    })
};
