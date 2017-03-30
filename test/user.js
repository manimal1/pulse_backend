/* eslint no-unused-expressions: 0 */
var expect = require('chai').expect;

describe('User', function() {
  var User;

  before(function() {
    User = require('../app/assets/javascripts/components/user');
    Location = require('../app/assets/javascripts/components/location');
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  describe('instance', function() {
    var user, loc1, loc2;

    beforeEach(function(done) {
      loc1 = new Location(45, 15);
      setTimeout(function() {
        loc2 = new Location(45, 16);
        user = new User(1, 'email', loc1);
        done();
      }, 1);
    });

    it('should have an id and email', function() {
      expect(user.id).to.equal(1);
      expect(user.email).to.equal('email');
    });

    it('should store initial location', function() {
      expect(user.location).to.equal(loc1);
    });

    it('should initially return falsy for previous location', function() {
      expect(user.previousLocation()).not.to.be.ok;
    });

    it('should be able to update location', function() {
      user.updateLocation(loc2);
      expect(user.location).to.equal(loc2);
    });

    it('should return previous location', function() {
      user.updateLocation(loc2);
      expect(user.previousLocation()).to.equal(loc1);
    });
  });
});
