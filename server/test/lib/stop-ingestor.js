var assert = require("assert"),
    StopIngestor = require("../../lib/stop-ingestor");

describe('stop-ingestor', function(){
  describe('#getStopsFromRoute()', function(){
    it('should return stops from route 2', function (done) {
      StopIngestor.getStopsFromRoute(2, function (err, res) {
        assert.ok(res[0].display_name);
        done();
      });
    })
    it('should return an hash of stops', function (done) {
      StopIngestor.getAllStops(function (err, res) {
        assert.ok(res);
        done();
      });
    })
  })
})
