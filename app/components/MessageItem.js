var React = require('react/addons');
var cx = React.addons.classSet;

var DateUtility = require('../utilities/DateUtility');
var Presence = require('./Presence');

var MessageItem = React.createClass({
    render: function() {
        var userId = parseInt(this.props.message.owner_id, 10);
        var created = new Date(this.props.message.created + ' UTC');
        created = DateUtility.ago(created);

        var classStates = [];
        classStates['online'] = true;
        classStates['presence-' + userId] = true;
        var classes = cx(classStates);

        return (
            <li>
                <span className="info">
                    <span className={classes}></span>
                    <strong>{this.props.message.name}</strong>
                    <span className="ago">{created}</span>
                </span>
                {this.props.message.text}
            </li>
        );
    }
});

module.exports = MessageItem;
