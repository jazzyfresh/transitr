var http = require("http"),

    RouteIngestor = require("./route-ingestor"),
    StopIngestor = require("./stop-ingestor"),

    routes = {},
    stops;

Route = function () {};

Route.prototype.findAll = function (callback) {
  var totalRoutes = Object.keys(routes).length;
  if (totalRoutes) {
    console.log("Cached routes");
    callback(null, routes);
  } else {
    RouteIngestor.getAllRoutes(function (err, docs) {
      console.log("Grabbed routes");
      docs.forEach(addToRouteHash);
      callback(null, docs);
    });
  }
};

Route.prototype.findById = function (routeId, callback) {
  var route = routes[routeId];
  if (route.stops && route.stops.length) {
    console.log("Cached route: " + routeId);
    callback(null, route);
  } else {
    StopIngestor.getStopsFromRoute(routeId, function (err, docs) {
      console.log("Grabbed route: " + routeId);
      route["stops"] = docs;
      routes[routeId] = route;
      callback(null, route);
    });
  }
};


/* Helper functions */

function addToRouteHash (route) {
  var routeId = route.id;
  if (!routes[routeId]) routes[routeId] = route;
};

module.exports = {

  Route: Route

};
