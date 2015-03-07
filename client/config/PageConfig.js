var container = document.getElementById('dashboard');
var pageData = JSON.parse(container ? container.dataset.pageData : "{}"); // Prevent express from complaining

var PageConfig = {
    getBaseUrl: function() {
        return pageData.baseUrl;
    },

    getClientId: function() {
        return pageData.clientId;
    },

    getUserId: function() {
        return pageData.userId;
    },

    getPageSocketChannel: function() {
        return 'abc';
    }
};

module.exports = PageConfig;
