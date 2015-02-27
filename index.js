var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var transpiler = require('react-tools');
require('node-jsx').install();

var app = express();

// templating
var swig = require('swig');

if (app.get('env') === 'development' || app.get('env') === 'test') {
    swig.setDefaults({
      cache: false
    });
}

app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment to enable gzip compression for prod
// app.use(compress());

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(__dirname + '/public'));

// Mongoose before route registration
var fs = require('fs');
var mongoose = require('mongoose');

var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect('mongodb://localhost/flightfox_dev', options);
};

connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Bootstrap models
fs.readdirSync(__dirname + '/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/models/' + file);
});

// routes

var routing = require('./config/routing');
routing.register(app);

module.exports = app;
