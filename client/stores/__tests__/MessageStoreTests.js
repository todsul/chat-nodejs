jest
    .dontMock('object-assign')
    .dontMock('keymirror')
    .dontMock('../../stores/MessageStore')
;

describe('MessageStore Unit Tests', function() {
    var ActionTypes = require('../../constants/DashboardConstants').ActionTypes;
    var callback;
    var DashboardDispatcher;
    var MessageStore;
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;

    beforeEach(function() {
        DashboardDispatcher = require('../../dispatchers/DashboardDispatcher');
        MessageStore = require('../../stores/MessageStore');
        callback = DashboardDispatcher.register.mock.calls[0][0];
    });

    // ACTIONS

    var fakeMessages = [
        {id: 1, text: 'text1'},
        {id: 2, text: 'text2'}
    ];

    var newMessage = [
        {id: 1, text: 'text1'}
    ];

    var actionCreateMessage = {action: {
        type: ActionTypes.CREATE_MESSAGE,
        text: 'Hi There'
    }};

    var actionCreateMessageFailure = {action: {
        type: ActionTypes.CREATE_MESSAGE_FAILURE,
        error:'There Was An Error'
    }};

    var actionCreateMessageSuccess = {action: {
        type: ActionTypes.CREATE_MESSAGE_SUCCESS,
        message: newMessage
    }};

    var actionGetMessages = {action: {
        type: ActionTypes.GET_MESSAGES
    }};

    var actionGetMessagesFailure = {action: {
        type: ActionTypes.GET_MESSAGES_FAILURE,
        error:'There Was An Error'
    }};

    var actionGetMessagesSuccess = {action: {
        type: ActionTypes.GET_MESSAGES_SUCCESS,
        messages: fakeMessages
    }};

    // TESTS

    it('registers a callback with the dispatcher', function() {
        expect(DashboardDispatcher.register.mock.calls.length).toBe(1);
    });

    it('initializes loading with no messages', function() {
        callback(actionGetMessages);
        var data = MessageStore.getState();
        var keys = Object.keys(data);
        expect(data.loading).toBeDefined();
        expect(data.loading).toBe(true);
        expect(data.messages).toBeDefined();
        expect(data.messages).toEqual([]);
    });

    it('displays an error on Get Messages failure', function() {
        spyOn(window, 'alert');
        callback(actionGetMessagesFailure);
        expect(alert).toHaveBeenCalledWith('There Was An Error');
    });

    it('stops loading and populates messages on Get Messages Success', function() {
        // Remember, must run getMessages first to set lockload
        callback(actionGetMessages);
        callback(actionGetMessagesSuccess);
        var data = MessageStore.getState();
        var keys = Object.keys(data);
        expect(data.loading).toBe(false);
        expect(data.messages.length).toBe(2);
        expect(data.messages[0].id).toBe(1);
    });

    it('sets processing flag to true on Create Message', function() {
        callback(actionCreateMessage);
        var data = MessageStore.getState();
        var keys = Object.keys(data);
        expect(data.processing).toBeDefined();
        expect(data.processing).toBe(true);
        expect(data.text).toBeDefined();
        expect(data.text).toEqual('Hi There');
    });

    it('resets data on receive Create Message Success', function() {
        callback(actionCreateMessageSuccess);
        var data = MessageStore.getState();
        var keys = Object.keys(data);
        expect(data.text).toBeDefined();
        expect(data.text).toEqual('');
        expect(data.processing).toBeDefined();
        expect(data.processing).toBe(false);
    });

    it('displays an error and resets processing prop on Create Message Error', function() {
        spyOn(window, 'alert');
        callback(actionCreateMessageFailure);
        var data = MessageStore.getState();
        var keys = Object.keys(data);
        expect(data.processing).toBeDefined();
        expect(data.processing).toBe(false);
        expect(alert).toHaveBeenCalledWith('There Was An Error');
    });
});
