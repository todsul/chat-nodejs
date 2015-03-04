/* @flow */

var React = require('react');

var MessageComposer = require('./MessageComposer');
var MessageList = require('./MessageList');
var MessageMore = require('./MessageMore');
var Presence = require('./Presence');

var Dashboard = React.createClass({
    render: function() {
        return (
            <div id="messages">
                <MessageComposer />
                <MessageList />
                <MessageMore />
                <Presence />
            </div>
        );
    }
});

module.exports = Dashboard;
