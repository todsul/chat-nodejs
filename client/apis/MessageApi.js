var Api = require('./Api');
var assign = require('object-assign');
var MessageConfig = require('../config/MessageConfig');
var PageConfig = require('../config/PageConfig');

var MessageApi = assign(new Api(), {
    createMessage: function(text, success, failure) {
        var postParams = {text: text};
        var url = PageConfig.getBaseUrl() + '/messages';

        MessageApi.postRequest(url, postParams, function(error, res) {
            MessageApi.postResponse(error, res, success, failure);
        });
    },

    getMessages: function(success, failure) {

        var queryParams = {count: MessageConfig.getMessageCount()};
        var url = PageConfig.getBaseUrl() + '/messages';

        MessageApi.getRequest(url, queryParams, function(error, res) {
            MessageApi.getResponse(error, res, success, failure, MessageApi.getMessages);
        });
    }
});

module.exports = MessageApi;
