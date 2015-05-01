
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Users = require('./models/Users');
var IndexController = require('./controllers/IndexController');
var mysql = require('mysql');
var CONSTANTS = require('./constants').constants;

/** Set Up Database */

var connection = mysql.createConnection({
	host: CONSTANTS.host,
	user: CONSTANTS.user,
	password: CONSTANTS.password,
	database: CONSTANTS.database
});
connection.connect();

/** Authentication */

passport.use(new LocalStrategy(function(username, password, done) {
	Users.checkValidUser(connection, username, password, function(err, rows, fields) {
		if (rows.length >= 1) {
			done(null, rows[0]);
		} else {
			done(null, false, { message: 'invalid user or incorrect password.'});
		}
	});
  }
));
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

/** App Setup */

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.configure(function() {
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.methodOverride());

	app.use(express.static('public'));
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.session({ secret: 'keyboard cat' }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);

	// init point into route registration
  	IndexController.registerRoutes(app, connection);
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

