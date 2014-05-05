var express = require('express'),
    http = require('http'),
    path = require('path'),
    pg = require('pg').native,
    connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/transitr',
    start = new Date(),
    client;

client = new pg.Client(connectionString);
client.connect();

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
