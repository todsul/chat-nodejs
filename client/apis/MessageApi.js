/* @flow */

var Api = require('./Api');
var assign = require('object-assign');
var PageUtility = require('../utilities/PageUtility');

var MessageApi = assign(new Api(), {
    createMessage: function(text, success, failure) {
        var postParams = {text: text};
        var url = PageUtility.getBaseUrl() + '/messages';

        MessageApi.postRequest(url, postParams, function(error, res) {
            MessageApi.postResponse(error, res, success, failure);
        });
    },

    getMessages: function(success, failure) {

        var queryParams = {count: PageUtility.getMessageCount()};
        var url = PageUtility.getBaseUrl() + '/messages';

        MessageApi.getRequest(url, queryParams, function(error, res) {
            MessageApi.getResponse(error, res, success, failure, MessageApi.getMessages);
        });
    }
});

module.exports = MessageApi;
