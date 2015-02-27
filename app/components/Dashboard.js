var React = require('react');

var MessageComposer = require('./MessageComposer');
var MessageCount = require('./MessageCount');
var MessageList = require('./MessageList');
var MessageMore = require('./MessageMore');
var Presence = require('./Presence');

var Dashboard = React.createClass({
    render: function() {
        return (
            <div id="message">
                <MessageComposer />
                <MessageList />
                <MessageMore />
                <Presence />
            </div>
        );
    }
});

module.exports = Dashboard;
