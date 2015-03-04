var PageUtility = jest.genMockFromModule('../PageUtility');

PageUtility.getBaseUrl = jest.genMockFunction().mockImplementation(function() {
    return 'https://flightfox.test';
});

PageUtility.getClientId = jest.genMockFunction().mockImplementation(function() {
    return 2;
});

PageUtility.getMessageCount = jest.genMockFunction().mockImplementation(function() {
    return 10;
});

PageUtility.getUserId = jest.genMockFunction().mockImplementation(function() {
    return 1;
});

module.exports = PageUtility;
