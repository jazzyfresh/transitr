
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var Route = require("./lib/metro-data").Route;
var route = new Route();


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.get('/', routes.index);
// app.get('/route/:id', routes.route);

app.get('/', function(req, res){
  route.findAll(function (err, docs) {
    res.render('index', {
      title: 'Transitr',
      routes: docs
    });
  });
});

app.get('/route/:id', function(req, res){
  route.findById(req.params.id, function (err, doc) {
    res.render('route', {
      route: doc,
      title: doc.display_name,
      stops: doc.stops
    });
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
