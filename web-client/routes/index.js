/*
 * GET home page.
 */
var RouteProvider = require('../route-provider').RouteProvider;
var routeProvider = new RouteProvider();

exports.index = function(req, res){
  routeProvider.findAll(function (err, docs) {
    res.render('index', {
      title: 'Transitr',
      routes: docs
    });
  });
};
