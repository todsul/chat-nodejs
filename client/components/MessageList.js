/* @flow */

var React = require('react/addons');
var cx = React.addons.classSet;

var MessageItem = require('./MessageItem');
var MessageStore = require('../stores/MessageStore');

function getState() {
    return MessageStore.getState();
}

var MessageList = React.createClass({
    getInitialState: function() {
        return getState();
    },

    componentDidMount: function() {
        MessageStore.addListener('list', this._onChange);
    },

    componentWillUnmount: function() {
        MessageStore.removeListener('list', this._onChange);
    },

    _onChange: function() {
        this.setState(getState());
    },

    render: function() {
        var listClasses = cx({
            'loading': this.state.loading && !this.state.messages.length
        });

        var messages = this.state.messages.map(function(message, i) {
            return (
                <MessageItem
                    key={message._id}
                    message={message}
                />
            );
        });

        return (
            <ul className={listClasses}>
                {messages}
            </ul>
        );
    },
});

module.exports = MessageList;
