var React = require('react/addons');
var PresenceStore = require('../stores/PresenceStore');

function getState() {
    return PresenceStore.getState();
}

var Presence = React.createClass({
    getInitialState: function() {
        return getState();
    },

    componentDidMount: function() {
        PresenceStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        PresenceStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(getState());
    },

    render: function() {
        var styles = '';

        for (var i in this.state.users) {
            styles += '#messages .online.presence-' + this.state.users[i].userId + '{background: #009b77;}';
        }

        return (
            <style>{styles}</style>
        );
    }
});

module.exports = Presence;
