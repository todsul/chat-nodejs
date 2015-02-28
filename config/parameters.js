var parameters = {
    development: {
        persistence: {
            connectionString: 'mongodb://localhost/flightfox_dev'
        }
    },

    production: {
        // TODO
    }
};

module.exports = {
    get: function(env) {
        return parameters[env] ? parameters[env] : parameters.development;
    }
};
