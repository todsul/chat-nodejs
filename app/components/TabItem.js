var React = require('react');
var cx = React.addons.classSet;

var TabItem = React.createClass({
    render: function() {
        var classes = cx({
            'tab': true,
            'on': this.props.on
        });

        return (
            <div className={classes} onClick={this.onClick}>
                {this.props.label}
                {this.props.children}
            </div>
        );
    },

    onClick: function(event) {
        this.props.onTabClick(this.props.index);
    }
});

module.exports = TabItem;
