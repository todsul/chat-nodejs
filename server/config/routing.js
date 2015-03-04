var routes = require('../routes/index');
var messages = require('../routes/messages');

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

function register(app, passport) {
    // Order is important
    app.use(function(req, res, next) {
        res.locals.req = req;
        next();
    });
    app.use('/', routes.register(app, passport).router());
    app.use('/messages', messages.register(app, passport).router());

    if (app.get('env') === 'development') {
        app.use(devErrorHandler);
    } else {
        app.use(prodErrorHandler);
    }

    app.use(notFoundErrorHandler);
}

module.exports = {register: register};
