var express = require('express');
var routes = require('./routes');
var twitter = require('./routes/twitter');
var http = require('http');
var path = require('path');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon('public/images/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// create database connection
var dbUrl = process.env.MONGOHQ_URL || 'localhost/twitter';
var monk = require('monk');
var db = monk(dbUrl);

var collection = db.get('twits');

// configure routes
app.get('/', routes.index);
app.get('/twitter', twitter.markers(collection));

// stream twitter feed
var stream = require('./lib/twitter.js')
stream.streamTwitter(collection);

//sart server here
http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

