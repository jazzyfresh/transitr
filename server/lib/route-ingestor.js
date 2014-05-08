var http = require("http"),
    routes = [];

function getAllRoutes (callback) {
  var routeData = "";
  http.get("http://api.metro.net/agencies/lametro/routes/", function (res) {
    res.on('data', function (chunk) {
      routeData += chunk;
    });
    res.on('end', function () {
      routes = massageRouteData(routeData);
      if (routes.length === 0) {
        console.log("No massaged routes...");
      } else {
        console.log("First massaged route: " + routes[0].display_name);
      }
      callback(null, routes);
    });
  }).on("error", function (err) {
    console.log("Got error: " + err.message);
  });
};

function massageRouteData (rawRouteData) {
  var rawRoutes,
      massagedRoutes;
  if (rawRouteData) {
    rawRoutes = JSON.parse(rawRouteData).items;
    massagedRoutes = rawRoutes.map(massageRoute);
  } else {
    massagedRoutes = [];
  }
  return massagedRoutes;
};

function massageRoute (rawRoute) {
  return rawRoute;
};

module.exports = {

  getAllRoutes: getAllRoutes

};
