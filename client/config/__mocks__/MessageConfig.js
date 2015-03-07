var MessageConfig = jest.genMockFromModule('../MessageConfig');

MessageConfig.getMessageCount = jest.genMockFunction().mockImplementation(function() {
    return 10;
});

module.exports = MessageConfig;
