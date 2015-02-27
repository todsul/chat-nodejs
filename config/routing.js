var routes = require('../routes/index');
var users = require('../routes/users');
var messages = require('../routes/messages');

// Mock session user
var mongoose = require('mongoose');
var User = mongoose.model('User');

function getSessionUser(req, res, next) {
    User.find().limit(1).exec(function(err, users) {
        var user = users && users.length > 0 ? users.shift() : null;
        req.user = user;
        next();
    });
}

function devErrorHandler(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
}

function prodErrorHandler(err, req, res, next) {
    res.status(err.status || 500);
    res.send("Sorry, there was an unexpected error. 500");
}

function notFoundErrorHandler(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}

function register(app) {
    // Order is important
    app.use(getSessionUser);
    app.use('/', routes);
    app.use('/users', users);
    app.use('/messages', messages);

    if (app.get('env') === 'development') {
        app.use(devErrorHandler);
    } else {
        app.use(prodErrorHandler);
    }

    app.use(notFoundErrorHandler);
}

module.exports = {register: register};
