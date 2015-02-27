var React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <div id="main">
                <div className="cell">
                    {this.props.children}
                </div>
            </div>
        );
    }
});
