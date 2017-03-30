/* eslint no-unused-expressions: 0 */
var expect = require('chai').expect;

var Location = require('../app/assets/javascripts/components/location');

describe('Location', function() {
  it('should be a function', function() {
    expect(Location).to.be.a('function');
  });

  describe('instance', function() {
    var loc;
    var timestamp = Date.now();

    beforeEach(function() {
      loc = new Location(45, 15, timestamp);
    });

    it('should have lat and lng', function() {
      expect(loc.lat).to.equal(45);
      expect(loc.lng).to.equal(15);
    });

    it('should provide lat lng array', function() {
      expect(loc.latLngArray()).to.eql([45, 15]);
    });

    it('should provide lat lng object', function() {
      expect(loc.latLng()).to.eql({
        lat: 45,
        lng: 15
      });
    });

    it('should store creation timestamp', function() {
      expect(loc.createdAt).to.equal(timestamp);
    });

    it('should set createdAt if timestamp not given', function() {
      var now = Date.now();
      var loc = new Location(45, 15);
      expect(loc.createdAt).to.equal(now);
    });
  });
});
