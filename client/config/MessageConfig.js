var messageCountMultiplier = 1;

var MessageConfig = {
    getMessageCount: function() {
        return messageCountMultiplier * 10;
    },

    incrementMessageCountMultiplier: function() {
        messageCountMultiplier++;
    },

    resetMessageCountMultiplier: function() {
        messageCountMultiplier = 1;
    }
};

module.exports = MessageConfig;
