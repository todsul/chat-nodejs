jest
    .dontMock('../MessageComposer')
    .dontMock('../../stores/MessageStore')
;

describe('MessageComposer Unit Tests', function() {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var MessageComposer = require('../../components/MessageComposer');
    var MessageActions = require('../../actions/MessageActions');

    // TESTS

    it('updates input text on change', function() {
        var component = TestUtils.renderIntoDocument(<MessageComposer />);

        // Verify textarea is empty
        var textarea = TestUtils.findRenderedDOMComponentWithTag(component, 'textarea');
        expect(textarea.getDOMNode().value).toEqual('');

        // Textarea updates
        TestUtils.Simulate.change(textarea, {target: {value: 'Hi There'}});
        expect(textarea.getDOMNode().value).toEqual('Hi There');
    });

    it('disables submit button if textarea is empty', function() {
        var component = TestUtils.renderIntoDocument(<MessageComposer />);

        // Button is disabled
        var button = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
        expect(button.getDOMNode().disabled).toEqual(true);

        // Button toggles to enabled
        var textarea = TestUtils.findRenderedDOMComponentWithTag(component, 'textarea');
        TestUtils.Simulate.change(textarea, {target: {value: 'Hi There'}});
        expect(button.getDOMNode().disabled).toEqual(false);
    });

    it('triggers a message creation on submit', function() {
        var component = TestUtils.renderIntoDocument(<MessageComposer />);

        // Adding some text
        var textarea = TestUtils.findRenderedDOMComponentWithTag(component, 'textarea');
        TestUtils.Simulate.change(textarea, {target: {value: 'Hi There'}});

        // Submit
        var button = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
        TestUtils.Simulate.click(button.getDOMNode());
        expect(MessageActions.createMessage).toBeCalledWith('Hi There');
    });
});
