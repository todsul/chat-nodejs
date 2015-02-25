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

        // PROGRAM

        GET_PROGRAMS: null,
        GET_PROGRAMS_FAILURE: null,
        GET_PROGRAMS_SUCCESS: null,

        GET_PROGRAM_OPTIONS: null,
        GET_PROGRAM_OPTIONS_FAILURE: null,
        GET_PROGRAM_OPTIONS_SUCCESS: null,

        ADD_PROGRAM: null,
        REMOVE_PROGRAM: null,

        REPLACE_PROGRAMS: null,
        REPLACE_PROGRAMS_FAILURE: null,
        REPLACE_PROGRAMS_SUCCESS: null,

        // PRESENCE

        UPDATE_PRESENCE: null
    }),

    SocketAlerts: keyMirror({
        MESSAGES_CHANGE: null,
        PROGRAMS_CHANGE: null,
    }),

    PayloadSources: keyMirror({
        VIEW_ACTION: null
    })
};
