var async = require("async"),
    stops = [];

function getAllstops (callback) {
  var stopData = "";
  http.get("http://api.metro.net/agencies/lametro/stops/", function (res) {
    res.on('data', function (chunk) {
      stopData += chunk;
    });
    res.on('end', function () {
      stops = massageStopData(stopData);
      callback(null, stops);
    });
  }).on("error", function (err) {
    console.log("Got error: " + err.message);
  });
};

function massageStopData (rawStopData) {
  var rawStops = JSON.parse(stopData).items,
      massagedStops;
  massagedStops = async.map(
    rawStops,
    massageStop,
    function (err, res) { }
  );
  return massagedStops;
};

function massageStop (rawStop) {
  return rawStop;
};

module.exports = {

  getAllStops: getAllStops

};
