var React = require('react');

var MessageComposer = require('./MessageComposer');
var MessageList = require('./MessageList');
var MessageMore = require('./MessageMore');
var Presence = require('./Presence');

var Dashboard = React.createClass({
    render: function() {
        return (
            <div>
                <div id="menu"></div>
                <div id="canvas">
                    <div className="panel">
                        <div id="messages">
                            <h2>Discussion</h2>
                            <MessageComposer />
                            <MessageList />
                            <MessageMore />
                            <Presence />
                        </div>
                    </div>
                    <div className="panel">
                        <div id="trips">
                            <h2>Itineraries</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Dashboard;
