module.exports = {
    accept: jest.genMockFunction().mockReturnThis(),
    end: jest.genMockFunction().mockReturnThis(),
    get: jest.genMockFunction().mockReturnThis(),
    post: jest.genMockFunction().mockReturnThis(),
    query: jest.genMockFunction().mockReturnThis(),
    set: jest.genMockFunction().mockReturnThis(),
    send: jest.genMockFunction().mockReturnThis()
};
