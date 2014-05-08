var http = require("http"),
    RouteIngestor = require("./route-ingestor"),
    routes,
    stops = {};

function getAllStops (callback) {
  var route,
      completedRequests = 0,
      totalRequests;
  RouteIngestor.getAllRoutes(function (err, res) {
    routes = res;
    totalRequests = routes.length;
    for (r in routes) {
      route = routes[r];
      getStopsFromRoute(route.id, function (err, res) {
        res.forEach(addToStopHash);
        completedRequests += 1;
        if (completedRequests === totalRequests) {
          console.log("Stops retrieved for " + completedRequests + " routes.");
          callback(null, stops);
        }
      });
    }
  });
}

function getStopsFromRoute (stopId, callback) {
  var stopData = "",
      stopsFromThisRoute,
      requestString = "http://api.metro.net/agencies/lametro/routes/" + stopId + "/stops/";
  http.get(requestString, function (res) {
    res.on('data', function (chunk) {
      stopData += chunk;
    });
    res.on('end', function () {
      stopsFromThisRoute = massageStopData(stopData);
      callback(null, stopsFromThisRoute);
    });
  }).on("error", function (err) {
    console.log("Got error: " + err.message);
  });
};

function massageStopData (rawStopData) {
  var rawStops,
      massagedStops;
  if (rawStopData) {
    rawStops = JSON.parse(rawStopData).items;
    massagedStops = rawStops.map(massageStop);
  } else {
    massagedStops = [];
  }
  return massagedStops;
};

function massageStop (rawStop) {
  return rawStop;
};

function addToStopHash (stop) {
  var stopId = stop.id;
  if (!stops[stopId]) stops[stopId] = stop;
};

module.exports = {

  getAllStops: getAllStops,
  getStopsFromRoute: getStopsFromRoute

};
