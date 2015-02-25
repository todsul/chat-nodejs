jest.dontMock('../ProgramComposer');

describe('ProgramComposer unit test', function() {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var ProgramComposer = require('../ProgramComposer');

    var programOptions = [
        {title: 'Airline', programs: [
            {id: 1, title: 'Adria Airways - Miles & More'},
            {id: 2, title: 'Aegean Airlines - Miles & Bonus'},
            {id: 3, title: 'Aer Arann - Silver Club'}
        ]},
        {title: 'Bank', programs: [
            {id: 167, title: 'American Express - Membership Rewards'},
            {id: 168, title: 'Chase - Ultimate Rewards'},
            {id: 169, title: 'Citibank - Thankyou Rewards'}
        ]}
    ];

    var formCollector;

    beforeEach(function() {
        formCollector = {
            callbacks: {},

            subscribeGetDataCallback: function(id, callback) {
                this.callbacks[id] = callback;
            },

            unsubscribeGetDataCallback: function(id) {
                delete this.callbacks[id];
            },

            getPrograms: function() {
                var data = [];
                for (var id in this.callbacks) {
                    var getComponentData = this.callbacks[id];
                    data.push(getComponentData().program);
                }

                return data;
            }
        };
    });

    it('renders with minimum props', function() {
        var component = TestUtils.renderIntoDocument(<ProgramComposer id={1} programOptions={programOptions} processing={false} formCollector={formCollector} />);

        var optGroups = TestUtils.scryRenderedDOMComponentsWithTag(component, 'optgroup');
        expect(optGroups.length).toEqual(2);
        expect(optGroups[0].getDOMNode().getAttribute('label')).toBe('Airline');
        expect(optGroups[1].getDOMNode().getAttribute('label')).toBe('Bank');

        var options = TestUtils.scryRenderedDOMComponentsWithTag(component, 'option');
        expect(options.length).toEqual(7); // 6 + default option with value "Other"

        var button = TestUtils.findRenderedDOMComponentWithTag(component, 'a');
        expect(button.getDOMNode().textContent).toBe('x');
    });

    it('changes state on interaction', function() {
        var program = {id: 167, balance: 300};

        var component = TestUtils.renderIntoDocument(<ProgramComposer id={1} programOptions={programOptions} program={program} processing={false} formCollector={formCollector} />);
        var select = TestUtils.findRenderedDOMComponentWithTag(component, 'select');
        TestUtils.Simulate.change(select, {target: {value: 3}});

        var balance = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
        TestUtils.Simulate.change(balance, {target: {value: 1000}});

        var data = formCollector.getPrograms();

        expect(data.length).toBe(1);
        expect(data[0].id).toBe(3);
        expect(data[0].balance).toBe(1000);
    });

});
