var React = require('react/addons');
var cx = React.addons.classSet;

var DateUtility = require('../utilities/DateUtility');
var Presence = require('./Presence');

var MessageItem = React.createClass({
    render: function() {
        var userId = this.props.message.user._id;
        var created = new Date(this.props.message.created);
        created = DateUtility.ago(created);

        var classStates = [];
        classStates['online'] = true;
        classStates['presence-' + userId] = true;
        var classes = cx(classStates);

        return (
            <li>
                <span className="info">
                    <span className={classes}></span>
                    <strong>{this.getFirstName()}</strong>
                    <span className="ago">{created}</span>
                </span>
                {this.props.message.text}
            </li>
        );
    },

    getFirstName: function() {
        return this.props.message.user.full_name.split(' ')[0];
    }
});

module.exports = MessageItem;
