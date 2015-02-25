var Api = require('./Api');
var assign = require('object-assign');
var PageUtility = require('../utilities/PageUtility');

var ProgramApi = assign(new Api(), {
    replacePrograms: function(programs, success, failure) {
        var postParams = {programs: programs};
        var url = PageUtility.getBaseUrl() + '/clients/' + PageUtility.getClientId() + '/programs';

        ProgramApi.postRequest(url, postParams, function(error, res) {
            ProgramApi.postResponse(error, res, success, failure);
        });
    },

    getPrograms: function(success, failure) {
        var queryParams = null;
        var url = PageUtility.getBaseUrl() + '/clients/' + PageUtility.getClientId() + '/programs';

        ProgramApi.getRequest(url, queryParams, function(error, res) {
            ProgramApi.getResponse(error, res, success, failure, ProgramApi.getPrograms);
        });
    },

    getProgramOptions: function(success, failure) {
        var queryParams = null;
        var url = PageUtility.getBaseUrl() + '/programs';

        ProgramApi.getRequest(url, queryParams, function(error, res) {
            ProgramApi.getResponse(error, res, success, failure, ProgramApi.getProgramOptions);
        });
    }
});

module.exports = ProgramApi;
