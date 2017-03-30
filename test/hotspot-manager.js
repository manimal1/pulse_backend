/* eslint no-unused-expressions: 0 */
var expect = require('chai').expect;

var store = require('../app/assets/javascripts/components/store');
var Location = require('../app/assets/javascripts/components/location');
var Hotspot = require('../app/assets/javascripts/components/hotspot');
var User = require('../app/assets/javascripts/components/user');
var hotspotManager = require('../app/assets/javascripts/components/hotspot-manager');

describe('Hotspot manager', function() {
  describe('on rooftop party', function() {
    var rooftopParty;
    var allObjects;

    before(function() {
      store.init();

      rooftopParty = require('./mock/rooftop-party.json');

      allObjects = rooftopParty.usersExpectedToBeInTheHotspot.concat(rooftopParty.userOutsideTheHotspot).concat(rooftopParty.existingHotspots);
      allObjects.forEach(function(objData) {
        var obj;

        if (objData.type === 'hotspot') {
          obj = new Hotspot(objData.id, '', new Location(objData.location[0], objData.location[1]));
        } else {
          obj = new User(objData.id, '', new Location(objData.location[0], objData.location[1]));
        }

        store.add(obj);
      });
    });

    it('should have all objects added', function() {
      expect(store.getAll().length).to.equal(allObjects.length);
    });

    it('should find users within the future hotspot radius', function() {
      var hotspotLocation = new Location(rooftopParty.futureHotspotLocation[0], rooftopParty.futureHotspotLocation[1]);
      var users = hotspotManager.getUsersForFutureHotspot(hotspotLocation);
      expect(users.length).to.equal(rooftopParty.usersExpectedToBeInTheHotspot.length);
    });

    it('should find nearest hotspot for new user location', function() {
      var user = new User(5, '', Location.newFromArray(rooftopParty.newUserLocation));
      var nearestHotspot = hotspotManager.getNearestHotspotForLocation(user.location);
      expect(nearestHotspot).to.be.ok;
      expect(nearestHotspot.id).to.equal(2);
    });
  });
});
