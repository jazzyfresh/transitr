var http = require('http');

RouteProvider = function () {};
RouteProvider.prototype.routes = [];

RouteProvider.prototype.findAll = function (callback) {
  if (this.routes.length === 0) {
    var routeData = "";
    http.get("http://api.metro.net/agencies/lametro/routes/", function (res) {
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

RouteProvider.prototype.findById = function(id, callback) {
  var i,
      routeResult,
      totalRoutes = this.routes.length,
      routeStopData = "",
      routeStopRequest = "http://api.metro.net/agencies/lametro/routes/" + id + "/stops/";
  for (i = 0; i < totalRoutes; i++) {
    if (this.routes[i].id === id) {
      routeResult = this.routes[i];
      break;
    }
  }
  http.get(routeStopRequest, function (res) {
    res.on('data', function (chunk) {
      routeStopData += chunk;
    });
    res.on('end', function () {
      var stops = JSON.parse(routeStopData).items;
      routeResult["stops"] = stops;
      RouteProvider.prototype.routes[i] = routeResult;
      callback(null, routeResult);
    });
  }).on("error", function (err) {
    console.log("Got error: " + err.message);
  });
};

exports.RouteProvider = RouteProvider;
