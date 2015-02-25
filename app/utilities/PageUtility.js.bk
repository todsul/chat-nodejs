var container = document.getElementById('dashboard');
var messageCountMultiplier = 1;
var UUID_delimiter = '_user_';

module.exports = {
    // GETTERS

    getBaseUrl: function() {
        return container.dataset.baseUrl;
    },

    getClientId: function() {
        return container.dataset.clientId;
    },

    getMessageCount: function() {
        return container.dataset.messageCount * messageCountMultiplier;
    },

    getUserId: function() {
        return container.dataset.userId;
    },

    getPageSocketChannel: function() {
        return container.dataset.pageSocketChannel;
    },

    getFlightfoxPubnubSubscribeKey: function() {
        return container.dataset.flightfoxPubnubSubscribeKey;
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
    },

    areProgramsEditable: function() {
        return this.getClientId() === this.getUserId();
    }
};
