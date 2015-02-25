var React = require('react/addons');
var cx = React.addons.classSet;

var ProgramActions = require('../actions/ProgramActions');
var ProgramComposer = require('./ProgramComposer');
var ProgramItem = require('./ProgramItem');
var ProgramStore = require('../stores/ProgramStore');
var formCollector = ProgramStore.getFormCollector();

function getState() {
    return ProgramStore.getState();
}

var ProgramList = React.createClass({
    getInitialState: function() {
        return getState();
    },

    componentDidMount: function() {
        ProgramStore.addListener(this._onChange);
    },

    componentWillUnmount: function() {
        ProgramStore.removeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(getState());
    },

    render: function() {
        var classes = cx({
            'loading': this.state.loading,
        });

        var liNodes;

        if (this.state.editable) {
            liNodes = this._getEditableLiNodes();
            liNodes.push(this._getUpdateButton());
        } else {
            liNodes = this._getReadOnlyLiNodes();
        }

        return (
            <ul className={classes}>
                {liNodes}
            </ul>
        );
    },

    _getEditableLiNodes: function() {
        var processing = this.state.processing;
        var programs = this.state.programs;
        var programOptions = this.state.programOptions;

        return programs.map(function(program, i) {
            var isLast = i === programs.length -1;
            var buttonRole = isLast ? 'add' : 'remove';

            return (
                <ProgramComposer
                    key={i} id={i}
                    program={program}
                    processing={processing}
                    formCollector={formCollector}
                    programOptions={programOptions}
                    buttonRole={buttonRole} />
            );
        });
    },

    _getUpdateButton: function() {
        var updateButtonClasses = cx({
            'button': true,
            'block': true,
            'loading': this.state.processing
        });

        return  (
            <li key="update_button">
                <button className={updateButtonClasses} onClick={this._onUpdateClick}>
                    Update
                </button>
            </li>
        );

    },

    _getReadOnlyLiNodes: function() {
        return this.state.programs.map(function(program, i) {
            return (
                <ProgramItem key={i} program={program} />
            );
        });
    },

    _onUpdateClick: function() {
        if (this.state.processing) return;
        if (!formCollector.isValid()) return;

        var programs = formCollector.getPrograms();
        ProgramActions.replacePrograms(programs);
    }
});

module.exports = ProgramList;
