var routes = require('../routes/index');
var messages = require('../routes/messages');

function notFoundErrorHandlers(req, res, next) {
    var err = new Error('Not Found');
    err.status = 405;
    next(err);
}

function prodErrorHandler(err, req, res, next) {
    var status = err.status || 500;
    res.status(status);

    var message = status === 400 ? 'Not found' : 'oops, the server went out for a walk, it will be back later :(';
    res.send(message);
    next(err);
}

function errorHandler(err, req, res, next) {
    console.log(" WILL CLOSE GRACEFULLY HERE ");
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

    app.use(notFoundErrorHandlers);

    if (app.get('env') === 'production') {
        app.use(prodErrorHandler);
    }

    app.use(errorHandler);
}

module.exports = {register: register};
