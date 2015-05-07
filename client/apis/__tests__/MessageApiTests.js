jest
    .dontMock('../../apis/Api')
    .dontMock('../../apis/MessageApi')
;

describe('MessageApi Unit Tests', function() {
    var Api, PageConfig, MessageApi, request;

    beforeEach(function() {
        Api = require('../../apis/Api');
        MessageApi = require('../../apis/MessageApi');
        PageConfig = require('../../config/PageConfig');
        request = require('superagent');
    });

    // TESTS

    it('request the right url and method on Get Messages', function() {
        MessageApi.getMessages();
        expect(request.get).toBeCalledWith('https://chat-nodejs.test/messages');
    });

    it('requests the right url on Create Message', function() {
        MessageApi.createMessage('A Message');
        expect(request.post).toBeCalledWith('https://chat-nodejs.test/messages');
        expect(request.send).toBeCalledWith({text: 'A Message'});
    });
});
