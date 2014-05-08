var async = require("async"),
    routes = [];

function getAllRoutes (callback) {
  var routeData = "";
  http.get("http://api.metro.net/agencies/lametro/routes/", function (res) {
    res.on('data', function (chunk) {
      routeData += chunk;
    });
    res.on('end', function () {
      routes = massageRouteData(routeData);
      callback(null, routes);
    });
  }).on("error", function (err) {
    console.log("Got error: " + err.message);
  });
};

function massageRouteData (rawRouteData) {
  var rawRoutes = JSON.parse(routeData).items,
      massagedRoutes;
  massagedRoutes = async.map(
    rawRoutes,
    massageRoute,
    function (err, res) { }
  );
  return massagedRoutes;
};

function massageRoute (rawRoute) {
  return rawRoute;
};

module.exports = {

  getAllRoutes: getAllRoutes

};
