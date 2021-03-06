var fs = require('fs');
var mongoose = require('mongoose');
var paramDataSet = require('./parameters');

function register(env) {
    var parameters = paramDataSet.get(env);
    var connectionString = parameters.persistence.connectionString;

    var connect = function() {
        var options = { server: { socketOptions: { keepAlive: 1 } } };
        mongoose.connect(connectionString, options);
    };

    connect();
    mongoose.connection.on('error', console.log);
    mongoose.connection.on('disconnected', connect);

    // Bootstrap models
    var modelsDir = __dirname + '/../models';
    fs.readdirSync(modelsDir).forEach(function (file) {
        if (~file.indexOf('.js')) require(modelsDir + '/' + file);
    });
}


module.exports = {register: register};
