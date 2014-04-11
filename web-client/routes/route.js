/*
 * GET transit route page
 */
var RouteProvider = require('../route-provider').RouteProvider;
var routeProvider = new RouteProvider();

exports.route = function(req, res){
  routeProvider.findById(req.params.id, function (err, doc) {
    res.render('route', {
      route: doc,
      title: doc.display_name,
      stops: doc.stops
    });
  });
};
