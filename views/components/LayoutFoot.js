var React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <div id="foot">
                <div className="cell">
                    Flightfox Inc.
                </div>
                <script type="text/javascript" src={this.props.bundleFile}></script>
            </div>
        );
    }
});
