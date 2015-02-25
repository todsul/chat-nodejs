var React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <body>
                <div id="head">
                    <div className="cell">
                        <a href="#login">Home</a>
                        <a href="#login">Dashboard</a>
                        <a href="#login">Blog</a>
                    </div>
                </div>
                <div id="main">
                    <div className="cell">{this.props.children}</div>
                </div>
                <div id="foot">
                    <div className="cell">
                        Flightfox Inc.
                    </div>
                </div>
                <script type="text/javascript" src="/public/js/dashboard.bundle.js"></script>
            </body>
        );
    }
});


// Head and Footer is hardcoded for now
