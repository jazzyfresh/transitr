var express = require('express'),
    http = require('http'),
    path = require('path'),
    pg = require('pg').native,
    connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/transitr',
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

app.get('/', function(req, res) {
  var stopString = "";
  query = client.query("select column_name from information_schema.columns where table_name='stops'");
  query.on('row', function(row, result) {
    console.log(result);
    result.addRow(row.column_name);
  });
  query.on('end', function(result) {
    if (!result) res.send('No data found');
    console.log(result.rows.join());
    stopString = "Stop columns: " + result.rows.join(", ");
    query = client.query("select column_name from information_schema.columns where table_name='routes'");
    query.on('row', function(row, result) {
      console.log(result);
      result.addRow(row.column_name);
    });
    query.on('end', function(result) {
      if (!result) res.send('No data found');
      console.log(result.rows.join());
      res.send(stopString + ". " + "Route columns: " + result.rows.join(", "));
    });
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
