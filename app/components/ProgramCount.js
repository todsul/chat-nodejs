var React = require('react/addons');
var cx = React.addons.classSet;

var ProgramStore = require('../stores/ProgramStore');

function getState() {
    return {
        count: ProgramStore.getUnreadCount(),
    };
}

var ProgramCount = React.createClass({
    getInitialState: function() {
        return getState();
    },

    componentDidMount: function() {
        ProgramStore.addListener('list', this._onChange);
    },

    componentWillUnmount: function() {
        ProgramStore.removeListener('list', this._onChange);
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

module.exports = ProgramCount;
