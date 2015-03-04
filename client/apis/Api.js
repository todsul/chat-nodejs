/* @flow */

var request = require('superagent');

// DEFAULTS

function Api() {
    this.getRequestTimestamp = null;
    this.postResponseTimestamp = null;
    this.staleRefreshCount = 0;
}

// REQUESTS

Api.prototype.getRequest = function(url, query, callback) {
    // Set timestamp of GET start to test against POST finish
    this.getRequestTimestamp = new Date().getTime();

    request
        .get(url)
        .accept('application/json')
        .query(query)
        .end(function(error, res) {
            callback(error, res);
        })
    ;
};

Api.prototype.postRequest = function(url, send, callback) {
    request
        .post(url)
        .accept('application/json')
        .send(send)
        .end(function(error, res) {
            callback(error, res);
        })
    ;
};

// RESPONSES

Api.prototype.getResponse = function(error, res, success, failure, refresh) {
    var response = this.translateResponse(error,res);

    if (!success && !failure) return;

    if (response.error) {
        failure(response.error);
    } else {
        if (this.isStale()) {
            this.staleRefreshCount++; // Must be before callback

            if (this.staleRefreshCount >= 5) { // Stops bugs from flooding the server
                this.staleRefreshCount = 0;
                this.getRequestTimestamp = null;
                failure('Network Error: Please refresh the page.');
            } else {
                refresh(success, failure);
            }
        } else {
            this.staleRefreshCount = 0;
            this.getRequestTimestamp = null;
            success(response.data);
        }
    }
};

Api.prototype.postResponse = function(error, res, success, failure) {
    var response = this.translateResponse(error,res);

    if (!success && !failure) return false;

    if (response.error) {
        failure(response.error);
    } else {
        // Set timestamp of POST finish to compare against GET start
        this.postResponseTimestamp = new Date().getTime() + 1; // 1ms buffer
        success(response.data);
    }
};

// CHECKS

Api.prototype.isStale = function() {
    // isStale = true if GET starts, but does not finish, before POST finishes
    if (this.getRequestTimestamp &&
        this.postResponseTimestamp &&
        this.getRequestTimestamp < this.postResponseTimestamp
    ) {
        return true;
    }

    return false;
};

// UTILITIES

Api.prototype.translateResponse = function(error, response) {
    var translatedError, translatedResponse;

    if (error) { // Application or network error
        translatedError = error.message;
    } else if (response.error) { // HTTP error
        translatedError = 'Error ' + response.error.status + ': please report to support@flightfox.com.';
    } else {
        translatedResponse = JSON.parse(response.text);
    }

    return {
        error: translatedError,
        data: translatedResponse
    };
};

module.exports = Api;
