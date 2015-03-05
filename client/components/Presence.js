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
        var on = ' {background: #009b77;} ';
        var off = ' {background: #dd4124;} ';



        for (var i in this.state.users) {
            var user = this.state.users[i];
            styles += '#messages .online.presence-' + user.userId;

            styles += user.status === 'on' ? on : off;
        }

        return (
            <style>{styles}</style>
        );
    }
});

module.exports = Presence;
