var React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <html lang="en">
                {this.props.children}
            </html>
        );
    }
});
