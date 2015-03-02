var parameters = {
    development: {
        persistence: {
            connectionString: 'mongodb://localhost/flightfox_dev'
        },

        session: {
            secret: 'flightoxxofthgilf'
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
