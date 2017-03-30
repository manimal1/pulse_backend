/* eslint no-unused-expressions: 0 */
var expect = require('chai').expect;

var store = require('../app/assets/javascripts/components/store');
var Location = require('../app/assets/javascripts/components/location');

describe('Store', function() {
  before(function() {
    store.init();
  });

  it('should be initialized', function() {
    expect(store).to.be.ok;
  });

  it('should add and retrieve object inside of bounds', function() {
    var obj = {
      location: new Location(45, 15),
      name: 'Name'
    };

    store.add(obj);
    expect(store.get(new Location(44, 14), new Location(46, 16))).to.eql([obj]);
  });

  it('shouldn\'t retrieve object outside of bounds', function() {
    var obj = {
      location: new Location(45, 15),
      name: 'Name'
    };

    store.add(obj);
    expect(store.get(new Location(47, 17), new Location(46, 16))).to.eql([]);
  });
});
