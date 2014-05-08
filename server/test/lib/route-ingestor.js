var assert = require("assert"),
    RouteIngestor = require("../../lib/route-ingestor");

describe('route-ingestor', function(){
  describe('#getAllRoutes()', function(){
    it('should return an array of routes', function (done) {
      RouteIngestor.getAllRoutes(function (err, res) {
        assert.ok(res);
        done();
      });
    })
  })
})
