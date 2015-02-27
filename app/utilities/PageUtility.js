//var container = document.getElementById('dashboard');
var messageCountMultiplier = 1;
var UUID_delimiter = '_user_';

module.exports = {
    // GETTERS

    getBaseUrl: function() {
        return 'http://localhost:3000';
    },

    getClientId: function() {
        return 5;
    },

    getMessageCount: function() {
        return 10 * messageCountMultiplier;
    },

    getUserId: function() {
        return 1;
    },

    getPageSocketChannel: function() {
        return 'abc';
    },

    getFlightfoxPubnubSubscribeKey: function() {
        return 'dummy_for_now';
    },

    // SETTERS

    incrementMessageCountMultiplier: function() {
        messageCountMultiplier++;
    },

    resetMessageCountMultiplier: function() {
        messageCountMultiplier = 1;
    },

    generateUUID: function(userId) {
        return (+new Date() + Math.floor(Math.random() * 999999)).toString(36) + UUID_delimiter + userId;
    },

    extractUserId: function(uuid) {
        var parts = uuid.split(UUID_delimiter);

        if (parts.length !== 2) {
            throw 'uuid.js wrong uuid format';
        }

        return parseInt(parts[1], 10);
    }
};
