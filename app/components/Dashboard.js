var React = require('react');

var MessageComposer = require('./MessageComposer');
var MessageCount = require('./MessageCount');
var MessageList = require('./MessageList');
var MessageMore = require('./MessageMore');
var Presence = require('./Presence');
var ProgramList = require('./ProgramList');

var TabGroup = require('./TabGroup');
var TabItem = require('./TabItem');
var TabPanel = require('./TabPanel');

var Dashboard = React.createClass({
    render: function() {
        return (
            <TabGroup>
                <TabItem label="Discussion">
                    <MessageCount />
                </TabItem>
                <TabItem label="Programs" />
                <TabPanel id="messages">
                    <MessageComposer />
                    <MessageList />
                    <MessageMore />
                    <Presence />
                </TabPanel>
                <TabPanel id="programs">
                    <ProgramList />
                </TabPanel>
            </TabGroup>
        );
    }
});

module.exports = Dashboard;
