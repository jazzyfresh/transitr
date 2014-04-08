
/*
 * GET home page.
 */
var BusRouteProvider = require('../busroute-provider').BusRouteProvider;
var busRouteProvider = new BusRouteProvider();

exports.index = function(req, res){
  busRouteProvider.findAll(function (err, docs) {
    res.render('index', {
      title: 'Transitr',
      routes: docs
    });
  });
};
