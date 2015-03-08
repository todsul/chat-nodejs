var React = require('react/addons');
var cx = React.addons.classSet;

var MessageActions = require('../actions/MessageActions');
var MessageStore = require('../stores/MessageStore');

function getState() {
    return MessageStore.getState();
}

var MessageComposer = React.createClass({
    getInitialState: function() {
        return getState();
    },

    componentDidMount: function() {
        MessageStore.addListener('form', this._onChange);
    },

    componentWillUnmount: function() {
        MessageStore.removeListener('form', this._onChange);
    },

    render: function() {
        var buttonClasses = cx({
            'button': true,
            'block': true,
            'loading': this.state.processing,
            'off': !this.state.text
        });

        var textClasses = cx({
            'focus': this.state.focus || this.state.text
        });

        return (
            <div id="messages_composer">
                <textarea
                    className={textClasses}
                    disabled={this.state.processing}
                    name="message"
                    onBlur={this._onTextBlur}
                    onChange={this._onTextChange}
                    onFocus={this._onTextFocus}
                    placeholder="Type your message..."
                    value={this.state.text}
                />
                <button
                    className={buttonClasses}
                    disabled={this.state.processing || !this.state.text}
                    onClick={this._onClick}
                >Post Message</button>
            </div>
        );
    },

    _onChange: function() {
        this.setState(getState());
    },

    _onClick: function() {
        MessageActions.createMessage(this.state.text);
    },

    _onTextBlur: function(event) {
        this.setState({focus: false});
    },

    _onTextChange: function(event) {
        this.setState({text: event.target.value});
    },

    _onTextFocus: function(event) {
        this.setState({focus: true});
    }
});

module.exports = MessageComposer;
