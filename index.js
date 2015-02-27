var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var transpiler = require('react-tools');
require('node-jsx').install();

var app = express();

// uncomment to enable gzip compression for prod
// app.use(compress());
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(__dirname + '/public'));

// config/*
require('./config/templating').register(app);
require('./config/persistence').register(app);
require('./config/routing').register(app);

module.exports = app;
