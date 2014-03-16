/**
 * Module dependencies.
 */

var express = require('express');
var pg = require('pg');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

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


// Routes
app.get('/', routes.index);
app.get('/users', user.list);

app.post('/RetrieveCadastre', function(req, res){
  RetrieveCadastre(req.body, res);
});

// RetrieveCadastre
function RetrieveCadastre(bounds, res){

  var connString = 'tcp://spatial:spatial@localhost/Spatial';

  pg.connect(connString, function(err, client) {

    var sql = 'select ST_AsGeoJSON(geog) as shape ';
    sql = sql + 'from spatial.state_1 ';
    sql = sql + 'where geog && ST_GeogFromText(\'SRID=4326;POLYGON(($1 $2,$3 $4,$5 $6,$7 $8,$9 $10))\') ';
    sql = sql + 'and ST_Intersects(geog, ST_GeogFromText(\'SRID=4326;POLYGON(($11 $12,$13 $14,$15 $16,$17 $18,$19 $20))\'));';

    var vals = [
      bounds._southWest.lng, bounds._southWest.lat, bounds._northEast.lng,
      bounds._southWest.lat, bounds._northEast.lng, bounds._northEast.lat,
      bounds._southWest.lng, bounds._northEast.lat, bounds._southWest.lng, bounds._southWest.lat
    ];
    var vals = vals.concat(vals);

    client.query(sql, vals, function(err, result) {
      var featureCollection = new FeatureCollection();

      for (i = 0; i < result.rows.length; i++)
      {
          featureCollection.features[i] = JSON.parse(result.rows[i].shape);
      }

      res.send(featureCollection);
    });
  });

}

// GeoJSON Feature Collection
function FeatureCollection(){
  this.type = 'FeatureCollection';
  this.features = new Array();
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
