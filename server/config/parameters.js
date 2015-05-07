var parameters = {
    dev: {
        server: {
            schema: 'http://',
            host: 'chat-nodejs.localhost',
            port: 3000,

            getBaseUrl: function() {
                return this.schema + this.host + ':' + this.port;
            }
        },

        persistence: {
            connectionString: 'mongodb://chat-nodejs.localhost/dev'
        },

        session: {
            secret: 'lauren'
        }
    },

    prod: {
        server: {
            schema: 'http://',
            host: '52.11.26.126',
            port: 80,

            getBaseUrl: function() {
                return this.schema + this.host + ':' + this.port;
            }
        },

        persistence: {
            connectionString: 'mongodb://chat-nodejs.localhost/prod'
        },

        session: {
            secret: 'lauren'
        }
    }
};

module.exports = {
    get: function(env) {
        if (!env) {
            env = 'dev';

            if (process.env.NODE_ENV) {
                env = process.env.NODE_ENV;
            }
        }

        if (['dev', 'prod'].indexOf(env) === -1) {
            throw new Error('Invalid environment: ' + env);
        }

        return parameters[env];
    }
};
