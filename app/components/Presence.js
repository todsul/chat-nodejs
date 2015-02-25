var React = require('react/addons');
var cx = React.addons.classSet;

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
        var on = 'background: #009b77;'
        var off = 'background: #dd4124;'

        this.state.users.map(function(user, i) {
            styles = styles + '.presence-' + user.userId + '{background: #009b77;}'; // Selector
            styles = styles;
        });

        return (
            <style>{styles}</style>
        );
    }
});

module.exports = Presence;
