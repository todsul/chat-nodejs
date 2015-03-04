var React = require('react/addons');
var cx = React.addons.classSet;

var MessageStore = require('../stores/MessageStore');

function getState() {
    return {
        count: MessageStore.getUnreadCount(),
    };
}

var MessageCount = React.createClass({
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
            'count': true,
            'new': this.state.count > 0,
        });

        return (
            <span className={classes}>{this.state.count}</span>
        );
    },

    _onChange: function() {
        this.setState(getState());
    }
});

module.exports = MessageCount;
