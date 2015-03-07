var React = require('react/addons');
var cx = React.addons.classSet;

var MessageActions = require('../actions/MessageActions');
var MessageConfig = require('../config/MessageConfig');
var MessageStore = require('../stores/MessageStore');

function getState() {
    return MessageStore.getState();
}

var MessageMore = React.createClass({
    getInitialState: function() {
        return getState();
    },

    componentDidMount: function() {
        MessageStore.addListener('list', this._onChange);
    },

    componentWillUnmount: function() {
        MessageStore.removeListener('list', this._onChange);
    },

    render: function() {
        var classes = cx({
            'off': !this.state.messages.length || this.state.all,
            'loading': this.state.loading
        });

        return (
            <a
                id="messages_more"
                href="#"
                onClick={this._onClick}
                className={classes}>
                Load More Comments
            </a>
        );
    },

    _onChange: function() {
        this.setState(getState());
    },

    _onClick: function(event) {
        MessageConfig.incrementMessageCountMultiplier();
        MessageActions.getMessages();
        event.preventDefault();
    }
});

module.exports = MessageMore;
