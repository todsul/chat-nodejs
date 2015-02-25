var ActionTypes = require('../constants/DashboardConstants').ActionTypes;
var DashboardDispatcher = require('../dispatchers/DashboardDispatcher');
var PageUtility = require('../utilities/PageUtility');
var ProgramApi = require('../apis/ProgramApi');

// Replace

function replaceProgramsSuccess(programs) {
    DashboardDispatcher.handleViewAction({
        type: ActionTypes.REPLACE_PROGRAMS_SUCCESS,
        programs: programs
    });
}

function replaceProgramsFailure(error) {
    DashboardDispatcher.handleViewAction({
        type: ActionTypes.REPLACE_PROGRAMS_FAILURE,
        error: error
    });
}

// Get

function getProgramsSuccess(programs) {
    DashboardDispatcher.handleViewAction({
        type: ActionTypes.GET_PROGRAMS_SUCCESS,
        programs: programs
    });
}

function getProgramsFailure(error) {
    DashboardDispatcher.handleViewAction({
        type: ActionTypes.GET_PROGRAMS_FAILURE,
        error: error
    });
}

// Get Options

function getProgramOptionsSuccess(programOptions) {
    DashboardDispatcher.handleViewAction({
        type: ActionTypes.GET_PROGRAM_OPTIONS_SUCCESS,
        programOptions: programOptions
    });
}

function getProgramOptionsFailure(error) {
    DashboardDispatcher.handleViewAction({
        type: ActionTypes.GET_PROGRAM_OPTIONS_FAILURE,
        error: error
    });
}

var ProgramActions = {
    addProgram: function() {
        DashboardDispatcher.handleViewAction({
            type: ActionTypes.ADD_PROGRAM
        });
    },

    removeProgram: function(indexAt) {
        DashboardDispatcher.handleViewAction({
            type: ActionTypes.REMOVE_PROGRAM,
            indexAt: indexAt
        });
    },

    replacePrograms: function(text) {
        DashboardDispatcher.handleViewAction({
            type: ActionTypes.REPLACE_PROGRAMS,
            text: text
        });

        ProgramApi.replacePrograms(text, replaceProgramsSuccess, replaceProgramsFailure);
    },

    getPrograms: function() {
        DashboardDispatcher.handleViewAction({
            type: ActionTypes.GET_PROGRAMS
        });

        ProgramApi.getPrograms(getProgramsSuccess, getProgramsFailure);
    },

    getProgramOptions: function() {
        DashboardDispatcher.handleViewAction({
            type: ActionTypes.GET_PROGRAM_OPTIONS
        });

        ProgramApi.getProgramOptions(getProgramOptionsSuccess, getProgramOptionsFailure);
    },
};

module.exports = ProgramActions;
