var container = document.getElementById('dashboard');
var pageData = JSON.parse(container ? container.dataset.pageData : "{}"); // Prevent express from complaining

var messageCountMultiplier = 1;
var UUID_delimiter = '_user_';

var PageUtility = {
    // GETTERS

    getBaseUrl: function() {
        return pageData.baseUrl;
    },

    getClientId: function() {
        return pageData.clientId;
    },

    getMessageCount: function() {
        return 10 * messageCountMultiplier;
    },

    getUserId: function() {
        return pageData.userId;
    },

    getPageSocketChannel: function() {
        return 'abc';
    },

    // SETTERS

    incrementMessageCountMultiplier: function() {
        messageCountMultiplier++;
    },

    resetMessageCountMultiplier: function() {
        messageCountMultiplier = 1;
    }
};

module.exports = PageUtility;
