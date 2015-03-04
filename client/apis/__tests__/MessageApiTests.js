jest
    .dontMock('../../apis/Api')
    .dontMock('../../apis/MessageApi')
;

describe('MessageApi Unit Tests', function() {
    var Api, PageUtility, MessageApi, request;

    beforeEach(function() {
        Api = require('../../apis/Api');
        MessageApi = require('../../apis/MessageApi');
        PageUtility = require('../../utilities/PageUtility');
        request = require('superagent');
    });

    // TESTS

    it('request the right url and method on Get Messages', function() {
        MessageApi.getMessages();
        expect(request.get).toBeCalledWith('https://flightfox.test/users/2/messages');
    });

    it('requests the right url on Create Message', function() {
        MessageApi.createMessage('A Message');
        expect(request.post).toBeCalledWith('https://flightfox.test/users/2/messages');
        expect(request.send).toBeCalledWith({text: 'A Message'});
    });
});
