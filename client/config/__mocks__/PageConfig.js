var PageConfig = jest.genMockFromModule('../PageConfig');

PageConfig.getBaseUrl = jest.genMockFunction().mockImplementation(function() {
    return 'https://flightfox.test';
});

PageConfig.getClientId = jest.genMockFunction().mockImplementation(function() {
    return 2;
});

PageConfig.getUserId = jest.genMockFunction().mockImplementation(function() {
    return 1;
});

module.exports = PageConfig;
