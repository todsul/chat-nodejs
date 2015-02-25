var React = require('react/addons');
var cx = React.addons.classSet;

var TabPanel = React.createClass({
    render: function() {
        var classes = cx({
            'panel': true,
            'on': this.props.on
        });

        return (
            <div id={this.props.id} className={classes}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = TabPanel;
