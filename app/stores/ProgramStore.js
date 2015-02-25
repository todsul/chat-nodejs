var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var ActionTypes = require('../constants/DashboardConstants').ActionTypes;
var DashboardDispatcher = require('../dispatchers/DashboardDispatcher');
var PageUtility = require('../utilities/PageUtility');

var CHANGE_EVENT = 'change';

var _state = {
    loading: true,
    processing: false,
    programs: [],
    editable: PageUtility.areProgramsEditable(),
    programOptions: [],
};

// Replace

function _onReplacePrograms() {
    _state.processing = true;
}

function _onReplaceProgramsFailure(error) {
    if (error) alert(error);
    _state.processing = false;
}

function _onReplaceProgramsSuccess(programs) {
    _state.processing = false;
    _state.programs = programs;
}

// Get

function _onGetProgramsFailure(error) {
    if (error) alert(error);
    _state.loading = false;
}

function _onGetProgramsSuccess(programs) {
    _state.programs = programs;
    _state.loading = false;
}

// Get options

function _onGetProgramOptionsSuccess(programOptions) {
    _state.programOptions = programOptions;
    _state.loading = false;
}

function _onGetProgramOptionsFailure(error) {
    if (error) alert(error);
    _state.loading = false;
}

// Add one / Remove one

function _onAddProgram() {
    _state.programs.push({id: null, title: '', balance: ''});
}

function _onRemoveProgram(indexAt) {
    delete _state.programs[indexAt];
}

// Form Helper

var _formCollector = {
    callbacks: {},

    subscribeGetDataCallback: function(id, callback) {
        this.callbacks[id] = callback;
    },

    unsubscribeGetDataCallback: function(id) {
        delete this.callbacks[id];
    },

    isValid: function() {
        for (var id in this.callbacks) {
            var getComponentData = this.callbacks[id];
            if (!getComponentData().isValid) return false;
        }

        return true;
    },

    getPrograms: function() {
        var programs = [];

        for (var id in this.callbacks) {
            var getComponentData = this.callbacks[id];
            var program = getComponentData().program;
            programs.push(program);
        }

        return programs.filter(function(program) {
            return parseInt(program.balance, 10) > 0;
        });
    }
};

var ProgramStore = assign({}, EventEmitter.prototype, {
    emitEvent: function() {
        this.emit(CHANGE_EVENT);
    },

    addListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getState: function() {
        return _state;
    },

    getFormCollector: function() {
        return _formCollector;
    }
});

DashboardDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
        // Add Remove row

        case ActionTypes.ADD_PROGRAM:
            _onAddProgram();
            ProgramStore.emitEvent();
            break;

        case ActionTypes.REMOVE_PROGRAM:
            _onRemoveProgram(action.indexAt);
            ProgramStore.emitEvent();
            break;

        // Replace

        case ActionTypes.REPLACE_PROGRAMS:
            _onReplacePrograms();
            ProgramStore.emitEvent();
            break;

        case ActionTypes.REPLACE_PROGRAMS_FAILURE:
            _onReplaceProgramsFailure(action.error);
            ProgramStore.emitEvent();
            break;

        case ActionTypes.REPLACE_PROGRAMS_SUCCESS:
            _onReplaceProgramsSuccess(action.programs);
            ProgramStore.emitEvent();
            break;

        // Get client's

        case ActionTypes.GET_PROGRAMS_FAILURE:
            _onGetProgramsFailure(action.error);
            ProgramStore.emitEvent();
            break;

        case ActionTypes.GET_PROGRAMS_SUCCESS:
            _onGetProgramsSuccess(action.programs);
            ProgramStore.emitEvent();
            break;

        // Get all options

        case ActionTypes.GET_PROGRAM_OPTIONS_SUCCESS:
            _onGetProgramOptionsSuccess(action.programOptions);
            ProgramStore.emitEvent();
            break;

        case ActionTypes.GET_PROGRAM_OPTIONS_FAILURE:
            _onGetProgramOptionsFailure(action.error);
            ProgramStore.emitEvent();
            break;

        default:
            // do nothing
    }
});

module.exports = ProgramStore;
