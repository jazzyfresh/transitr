var http = require('http');
var async = require('async');
var metroAPI = "http://api.metro.net/agencies/lametro";

RouteProvider = function () {};
RouteProvider.prototype.routes = [];

function httpRequest(request, callback) {
  var data = "";
  http.get(request, function (res) {
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on('end', function () {
      callback(data);
    }).on('error', function (err) {
      console.log("Error: " + err.message);
    });
  });
}

function updatePredictions(routeId, stops, callback) {
  var i,
      stop,
      stopsWithPredictions = [],
      totalStops = stops.length,
      metroPredictionRequest,
      metroPredictionRequests = [],
      metroStopAPI = metroAPI + "/stops/",
      completedRequests = 0;
  for (i = 0; i < totalStops; i++) {
    stop = stops[i];
    metroPredictionRequest = metroStopAPI + stop.id + "/predictions/";
  }
  for (r in metroPredictionRequests) {
    httpRequest(metroPredictionRequests[r], function (data) {
      var stopWithPrediction = stop,
          predictions = JSON.parse(data).items;
      console.log(data);
      for (p in predictions) {
        if (predictions[p].route_id === stopWithPrediction.id) {
          stopWithPrediction["prediction"] = predictions[p];
          break;
        }
      }
      stopsWithPredictions.push(stopWithPrediction);
      completedRequests += 1;
      if (completedRequests === totalStops) {
        callback(stopsWithPredictions);
      }
    });
  }
}


RouteProvider.prototype.findAll = function (callback) {
  if (this.routes.length === 0) {
    var routeRequest = metroAPI + "/routes/";
    httpRequest(routeRequest, function (data) {
        var routes = JSON.parse(data).items;
        RouteProvider.prototype.routes = routes;
        callback(null, routes);
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
    httpRequest(routeStopRequest, function (data) {
      stops = JSON.parse(data).items;
      updatePredictions(
        routeId,
        stops,
        function (modifiedStops) {
          routeResult["stops"] = modifiedStops || stops;
          RouteProvider.prototype.routes[i] = routeResult;
          callback(null, routeResult);
        });
    });
  }
};

exports.RouteProvider = RouteProvider;
