var React = require('react/addons');

var TabItem = require('./TabItem');
var TabPanel = require('./TabPanel');

var TabGroup = React.createClass({
    getInitialState: function() {
        return {on: 0};
    },

    render: function() {
        var tabs = [];
        var panels = [];

        React.Children.forEach(this.props.children, function(Child) {
            if (Child.type === TabItem.type) {
                tabs.push(Child);
            } else if (Child.type === TabPanel.type) {
                panels.push(Child);
            } else {
                throw "Only TabItem or TabPanel can be child of TabGroup";
            }
        });

        if (tabs.length !== panels.length) {
            throw "Number of TabItems vs TabPanels does not match.";
        }

        var state = this.state;
        var self = this;

        var tabNodes = tabs.map(function(TabItem, index) {
            return React.addons.cloneWithProps(TabItem, {
                on: index === state.on,
                index: index,
                onTabClick: self.onTabClick,
                key: index
            });
        });

        var panelNodes = panels.map(function(TabPanel, index) {
            return React.addons.cloneWithProps(TabPanel, {
                on: index === state.on,
                index: index,
                key: index
            });
        });

        return (
           <div id={this.props.id} className="tabgroup">
                <div className="tabs">
                    {tabNodes}
                </div>
                <div className="panels">
                    {panelNodes}
                </div>
            </div>
        );
    },

    onTabClick: function(index) {
        var state = this.state;
        state.on = index;
        this.setState(state);
    }
});


module.exports = TabGroup;
