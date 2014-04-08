var http = require('http');

BusRouteProvider = function () {};
BusRouteProvider.prototype.busRoutes = [];

BusRouteProvider.prototype.findAll = function (callback) {
  if (this.busRoutes.length === 0) {
    var busData = "";
    http.get("http://api.metro.net/agencies/lametro/routes/", function (res) {
      res.on('data', function (chunk) {
        busData += chunk;
      });
      res.on('end', function () {
        var busRoutes = JSON.parse(busData).items;
        BusRouteProvider.prototype.busRoutes = busRoutes;
        callback(null, busRoutes);
      });
    }).on("error", function (err) {
      console.log("Got error: " + err.message);
    });
  } else {
    callback(null, this.busRoutes);
  }
};

BusRouteProvider.prototype.findById = function(id, callback) {
  var result = null,
      totalBusRoutes = this.busRoutes.length;
  for (var i = 0; i < totalBusRoutes; i++) {
    if (this.busRoutes[i].id === id) {
      result = this.busRoutes[i];
      break;
    }
  }
  callback(null, result);
};

exports.BusRouteProvider = BusRouteProvider;
