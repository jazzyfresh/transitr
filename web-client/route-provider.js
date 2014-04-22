var http = require('http');
var async = require('async');
var metroAPI = "http://api.metro.net/agencies/lametro";

RouteProvider = function () {};
RouteProvider.prototype.routes = [];

function updatePredictions(routeId, stops) {
  var i,
      stop,
      totalStops = stops.length,
      metroStopAPI = metroAPI + "/stops/",
      metroPredictionRequests = [];
  for (i = 0; i < totalStops; i++) {
    stop = stops[i];
    metroPredictionRequests.push(metroStopAPI + stop.id);
  }
  async.map(
      stops,
      function (stop) {
        http.get(metroStopAPI + stop.id, function (res) {
          res.on('data', function (chunk) {
            route

      },
      function (err, res) {

      });
}


RouteProvider.prototype.findAll = function (callback) {
  if (this.routes.length === 0) {
    var routeData = "",
        metroRouteAPI = metroAPI + "/routes/";
    http.get(metroRouteAPI, function (res) {
      res.on('data', function (chunk) {
        routeData += chunk;
      });
      res.on('end', function () {
        var routes = JSON.parse(routeData).items;
        RouteProvider.prototype.routes = routes;
        callback(null, routes);
      });
    }).on("error", function (err) {
      console.log("Got error: " + err.message);
    });
  } else {
    callback(null, this.routes);
  }
};

RouteProvider.prototype.findById = function(routeId, callback) {
  var i,
      stops,
      routeResult,
      totalRoutes = this.routes.length,
      routeStopData = "",
      routeStopRequest = metroAPI + "/routes/" + routeId + "/stops/";

  for (i = 0; i < totalRoutes; i++) {
    if (this.routes[i].id === routeId) {
      routeResult = this.routes[i];
      break;
    }
  }

  if (routeResult["stops"]) {
    callback(null, routeResult);
  } else {
    http.get(routeStopRequest, function (res) {
      res.on('data', function (chunk) {
        routeStopData += chunk;
      });
      res.on('end', function () {
        stops = JSON.parse(routeStopData).items;
        routeResult["stops"] = stops;
        // routeResult["stops"] = updatePredictions(routeId, stops);
        RouteProvider.prototype.routes[i] = routeResult;
        callback(null, routeResult);
      });
    }).on("error", function (err) {
      console.log("Got error: " + err.message);
    });
  }
};

exports.RouteProvider = RouteProvider;