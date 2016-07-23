// require packages
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// declare routes
var index = require('./routes/index');
var todos = require('./routes/todos');

// init express app
var app = express();
var PORT = 5000;
var HOST = 'localhost';

// init views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// declare index and api route
app.use('/', index);
app.use('/api/v1/', todos);

// catch 404 (route not found) errors
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

var server = app.listen(PORT, function() {
	var host = HOST;
	var port = server.address().port;
	console.log('App listening at http://' + host + ':' + port);
});

module.exports = app;

