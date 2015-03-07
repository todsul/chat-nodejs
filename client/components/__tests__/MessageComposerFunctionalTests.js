jest
    .dontMock('../MessageComposer')
    .dontMock('../MessageList')
    .dontMock('../../actions/MessageActions')
    .dontMock('../../apis/Api')
    .dontMock('../../apis/MessageApi')
    .dontMock('../../stores/MessageStore')
    .dontMock('../../dispatchers/DashboardDispatcher')
;

describe('MessageComposer Functional Tests', function() {
    var React, TestUtils, request, MessageComposer, MessageList, MessageActions;

    beforeEach(function() {
        React = require('react/addons');
        TestUtils = React.addons.TestUtils;
        request = require('superagent');
        MessageComposer = require('../MessageComposer');
        MessageList = require('../MessageList');
        MessageActions = require('../../actions/MessageActions');
    });

    // TESTS

    it('clears text on success', function() {
        var component = TestUtils.renderIntoDocument(<MessageComposer />);

        // Adding some text
        var textarea = TestUtils.findRenderedDOMComponentWithTag(component, 'textarea');
        TestUtils.Simulate.change(textarea, {target: {value: 'Hi there'}});

        // Get the callback defined in .end and pass custom params for when it gets executed
        var message = {"_id":"4","created":"2015-04-04 15:00:00","text":"Hi there", "user": {"_id": 1, "full_name": "Fox"}};

        request.end.mockImplementation(function(callback) {
            var error = null;
            var response  = {text: JSON.stringify(message)};
            callback(error, response);
        });

        // Submit
        var button = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
        TestUtils.Simulate.click(button.getDOMNode());
        expect(request.post).toBeCalledWith('https://flightfox.test/messages');
        expect(textarea.getDOMNode().value).toEqual('');
    });

    it('retains text on error', function() {
        var component = TestUtils.renderIntoDocument(<MessageComposer />);

        // Adding some text
        var textarea = TestUtils.findRenderedDOMComponentWithTag(component, 'textarea');
        TestUtils.Simulate.change(textarea, {target: {value: 'Hi there'}});

        // Get the callback defined in .end and pass custom params for when it gets executed
        request.end.mockImplementation(function(callback) {
            var error = {message: 'sorry buddy'};
            var response  = {};
            callback(error, response);
        });

        // Spy on window alert, otherwise an exception is thrown because the store will trigger the alert.
        spyOn(window, 'alert');

        // Submit
        var button = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
        TestUtils.Simulate.click(button.getDOMNode());

        expect(request.post).toBeCalledWith('https://flightfox.test/messages');
        expect(alert).toHaveBeenCalledWith('sorry buddy');

        expect(textarea.getDOMNode().value).toEqual('Hi there');
    });

    it('loads messages on Get Messages success', function() {
        var component = TestUtils.renderIntoDocument(<MessageList />);

        // Get the initial message list
        var list = TestUtils.findRenderedDOMComponentWithTag(component, 'ul');
        expect(React.Children.count(list.props.children)).toEqual(0);

        // Create messages
        var messages  = [
            {"_id":"1","created":"2015-01-01 12:00:00","text":"Hello", "user": {"_id": "1", "full_name": "Fox"}},
            {"_id":"2","created":"2015-02-02 13:00:00","text":"Hola", "user": {"_id": "1", "full_name": "Fox"}},
            {"_id":"3","created":"2015-03-03 14:00:00","text":"Yo", "user": {"_id": "1", "full_name": "Fox"}}
        ];

        // Get the callback defined in .end and pass custom params for when it gets executed
        request.end.mockImplementation(function(callback) {
            var error = null;
            var response  = {text: JSON.stringify(messages)};
            callback(error, response);
        });

        // Trigger Get Messages Success
        MessageActions.getMessages();
        expect(React.Children.count(list.props.children)).toEqual(3);
    });

    it('shows error on Get Messages failure', function() {
        var component = TestUtils.renderIntoDocument(<MessageList />);

        // Get the initial message list
        var list = TestUtils.findRenderedDOMComponentWithTag(component, 'ul');
        expect(React.Children.count(list.props.children)).toEqual(0);

        // Get the callback defined in .end and pass custom params for when it gets executed
        request.end.mockImplementation(function(callback) {
            var error = {message: 'Whomp Whomp!'};
            var response  = null;
            callback(error, response);
        });

        // Spy on window alert, otherwise an exception is thrown because the store will trigger the alert.
        spyOn(window, 'alert');

        // Get Messages
        MessageActions.getMessages();
        expect(alert).toHaveBeenCalledWith('Whomp Whomp!');
        expect(React.Children.count(list.props.children)).toEqual(0);
    });
});
