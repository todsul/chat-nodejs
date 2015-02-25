var React = require('react');
var cx = React.addons.classSet;

var ProgramActions = require('../actions/ProgramActions');

var ProgramComposer = React.createClass({
    propTypes: {
        id: React.PropTypes.number.isRequired,
        formCollector: React.PropTypes.object.isRequired,
        processing: React.PropTypes.bool.isRequired,
        programOptions: React.PropTypes.array.isRequired,
        program: React.PropTypes.object,
        buttonRole: React.PropTypes.oneOf(['add', 'remove'])
    },

    getInitialState: function() {
        var program = this.props.program ? this.props.program : {id: null, balance: null};

        return {
            program: program
        };
    },

    componentDidMount: function() {
        var self = this;

        // callback to retrieve a given form on demand.
        this.props.formCollector.subscribeGetDataCallback(this.props.id, function() {
            return {program: self.state.program, isValid: self._isBalanceValid(self.state.program.balance)};
        });
    },

    componentWillUnmount: function() {
        this.props.formCollector.unsubscribeGetDataCallback(this.props.id);
    },

    componentWillReceiveProps: function() {

    },

    render: function() {
        var optionGroupNodes = this._getOptionGroupNodes();
        var button = this._getAdminButton();

        var balanceClasses = cx({
            'balance': true,
            'errors': !this._isBalanceValid(this.state.program.balance)
        });

        return (
            <li className="program-composer clearfix">
                <div className="program">
                    <div className="select">
                        <select value={this.state.program.id} onChange={this._onSelectChange} disabled={this.props.processing}>
                            <option>Other</option>
                            {optionGroupNodes}
                        </select>
                    </div>
                </div>
                <div className={balanceClasses}>
                    <input
                        type="text"
                        disabled={this.props.processing}
                        onChange={this._onBalanceChange}
                        value={this.state.program.balance}
                        placeholder="e.g. 100000"
                    />
                    {button}
                </div>
            </li>
        );
    },

    _getOptionGroupNodes: function() {
        return this.props.programOptions.map(function(group, i) {
            var optionNodes = group.programs.map(function(program, j) {
                return (
                    <option key={i.toString() + j.toString()} value={program.id}>
                        {program.title}
                    </option>
                );
            });

            return (
                <optgroup key={i} label={group.title}>
                    {optionNodes}
                </optgroup>
            );
        });
    },

    _getAdminButton: function() {
        var adminClasses = cx({
            'admin': true,
            'processing': this.props.processing
        });

        if (this.props.buttonRole === 'add') {
            adminClasses += ' add';
            return (<a href="#" className={adminClasses} onClick={this._onAdd}>+</a>);
        } else {
            adminClasses += ' del';
            return (<a href="#" className={adminClasses} onClick={this._onRemove}>x</a>);
        }
    },

    _onSelectChange: function(event) {
        var state = this.state;
        state.program.id = event.target.value;
        this.setState(state);
    },

    _onBalanceChange: function(event) {
        var state = this.state;
        var balance = event.target.value;
        state.program.balance = balance;
        this.setState(state);
    },

    _isBalanceValid: function(balance) {
        var reg = new RegExp(/^\d+$/);
        var isValidNumber = reg.test(balance) && !isNaN(balance) && parseInt(balance, 10) > 0;
        var isEmptyAndIsLastRow = balance === '' && this.props.buttonRole === 'add';

        return isValidNumber || isEmptyAndIsLastRow;
    },

    _onAdd: function(event) {
        event.preventDefault();
        if (this.props.processing) return;
        ProgramActions.addProgram();
    },

    _onRemove: function(event) {
        event.preventDefault();
        if (this.props.processing) return;
        ProgramActions.removeProgram(this.props.id);
    }

});

module.exports = ProgramComposer;
