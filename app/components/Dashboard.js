var React = require('react');

var Layout = require('./Layout');
var LayoutHead = require('./LayoutHead');
var LayoutBody = require('./LayoutBody');


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
            <Layout>
                <LayoutHead
                canonical={"https://flightfox.com/dashboard"}
                title={"Dashboard"} />
                <LayoutBody>
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
                </LayoutBody>
            </Layout>
        );
    }
});

module.exports = Dashboard;
