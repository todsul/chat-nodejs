var React = require('react');

var NumberUtility = require('../utilities/NumberUtility');

var ProgramItem = React.createClass({
    propTypes: {
        program: React.PropTypes.object.isRequired,
    },

    render: function() {
        var title = this.props.program.title ? this.props.program.title : "Other";
        return (
            <li>
                <span>{title}</span>
                <span className="balance">{NumberUtility.format(this.props.program.balance)}</span>
            </li>
        );
    }
});

module.exports = ProgramItem;
