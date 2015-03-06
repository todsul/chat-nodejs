var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var passport = require('passport');
var transpiler = require('react-tools');

require('node-jsx').install();

var app = express();

// uncomment to enable gzip compression for prod
if (app.get('env') === 'production' || app.get('env') === 'staging') {
    app.use(compress());
}
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev')); // @TODO set accordingly to real env
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(__dirname + '/../public'));
app.use(cookieParser());

// config/*
require('./config/templating').register(app);
require('./config/persistence').register(app.get('env'));
require('./config/passport').register(passport);
require('./config/session').register(app, passport);
require('./config/routing').register(app, passport);

module.exports = app;
