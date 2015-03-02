var cookieSession = require('cookie-session');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var paramDataSet = require('./parameters');

function register(app, passport) {
    var parameters = paramDataSet.get(app.get('env'));

    app.use(cookieSession({ secret: parameters.session.secret }));
    app.use(session({
        resave: false,
        saveUninitialized: false,
        unset: 'destroy',
        secret: parameters.session.secret,
        store: new mongoStore({
            url: parameters.persistence.connectionString,
            collection : 'sessions',
        })
    }));

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    // Should be declared after sessions
    app.use(flash());
}

module.exports = {register: register};
