jest
    .dontMock('object-assign')
    .dontMock('../../apis/Api')
;

describe('Api Unit Tests', function() {
    var Api, ApiInstance, assign, PageUtility, request;
    var collision, collisionCount, numberOfCollisions;

    beforeEach(function() {
        Api = require('../../apis/Api');
        ApiInstance = new Api();
        assign = require('object-assign');
        PageUtility = require('../../utilities/PageUtility');
        request = require('superagent');

        collision = function refresh() {
            request.end.mockImplementation(function(callback) {
                var error = null;
                var response = {text: JSON.stringify({})};
                callback(error, response);
            });

            ApiInstance.getRequest(null, null, function(error, res) {
                // Step 1 - GetRequest starts
                expect(ApiInstance.getRequestTimestamp).not.toBeNull();

                if (collisionCount < numberOfCollisions) {
                    ApiInstance.postRequest(null, null, function(error, res) {
                        // Step 2 - PostRequest starts
                        expect(ApiInstance.postRequestDate).not.toBeNull();

                        ApiInstance.postResponse(error, res, function() {}, function() {});

                        // Step 3 - PostResponse arrives before getResponse
                        expect(ApiInstance.postResponseTimestamp).not.toBeNull();
                    });

                    // Step 4 - GetRequest is now stale
                    expect(ApiInstance.staleRefreshCount).toEqual(collisionCount);
                    collisionCount++;
                }

                var failure = jest.genMockFunction().mockImplementation(function() {});

                // Step 5 - Refresh callback is called since GetResponse is stale
                ApiInstance.getResponse(error, res, function() {}, failure, refresh);
                // TODO get this test to work below on non-mocked function
                // expect(refresh).toBeCalled();
            });
        };
    });

    // TESTS

    it('refresh is called after collision detected', function() {
        // Make sure constructor is correct
        expect(ApiInstance.getRequestTimestamp).toBeNull();
        expect(ApiInstance.postResponseTimestamp).toBeNull();
        expect(ApiInstance.staleRefreshCount).toEqual(0);
        expect(ApiInstance.isStale()).toBeFalsy();

        collisionCount = 0;
        numberOfCollisions = 2;
        collision();

        // Limit is 5
        expect(collisionCount).toEqual(numberOfCollisions);

        expect(ApiInstance.getRequestTimestamp).toBeNull();
        expect(ApiInstance.staleRefreshCount).toEqual(0);
        expect(ApiInstance.isStale()).toBeFalsy();
    });

    it('error is thrown on refresh flood', function() {
        // Make sure constructor is correct
        expect(ApiInstance.getRequestTimestamp).toBeNull();
        expect(ApiInstance.postResponseTimestamp).toBeNull();
        expect(ApiInstance.staleRefreshCount).toEqual(0);
        expect(ApiInstance.isStale()).toBeFalsy();

        collisionCount = 0;
        numberOfCollisions = 10;
        collision();

        // Limit is 5
        expect(collisionCount).toEqual(5);

        expect(ApiInstance.getRequestTimestamp).toBeNull();
        expect(ApiInstance.staleRefreshCount).toEqual(0);
        expect(ApiInstance.isStale()).toBeFalsy();
    });
});
