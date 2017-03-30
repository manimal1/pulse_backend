'use strict';

/**
 * Public Api for hotspot Manager
 *
 * @typedef {Object} hotspotManagerApi
 *  @param {Function} getUsersForFutureHotspot
 *  @param {Function} getNearestHotspotForLocation
 */

/**
 * Requires
 */
var store = require('./store');
var Location = require('./location');
var User = require('./user');
var Hotspot = require('./hotspot');

var OFFSET = 0.0015;

/**
 * Filters Hotspots
 *
 * @param {Array} arr
 * @param klass
 *
 * @returns {Array}
 */
function filter(arr, klass) {
  var res = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] instanceof klass) {
      res.push(arr[i]);
    }
  }
  return res;
}

/**
 * Creates radius based on specific location
 *
 * @param {Object} loc object displaying location
 * @returns {{minLatLng: Location, maxLatLng: Location}}
 */
function createOffsetBounds(loc) {
  return {
    minLatLng: new Location(loc.lat - OFFSET, loc.lng - OFFSET),
    maxLatLng: new Location(loc.lat + OFFSET, loc.lng + OFFSET)
  };
}

/**
 *
 * @param loc
 * @returns {Array}
 */
function getUsersForFutureHotspot(loc) {
  var offsetBounds = createOffsetBounds(loc);
  var objects = store.get(offsetBounds.minLatLng, offsetBounds.maxLatLng);

  return filter(objects, User);
}

/**
 * Gets nearest hotspot location
 *
 * @param loc
 * @returns {*}
 */
function getNearestHotspotForLocation(loc) {
  var offsetBounds = createOffsetBounds(loc);
  var objects = store.get(offsetBounds.minLatLng, offsetBounds.maxLatLng);
  var hotspots = filter(objects, Hotspot);

  var nearsetHotspotLocation = loc.nearest(hotspots.map(function(hotspot) {
    return hotspot.location;
  }));

  for (var i = 0; i < hotspots.length; i++) {
    if (hotspots[i].location === nearsetHotspotLocation) {
      return hotspots[i];
    }
  }
}


/**
 * Public interface
 *
 * @type {hotspotManagerApi} public interface
 */
module.exports = {
  getUsersForFutureHotspot: getUsersForFutureHotspot,
  getNearestHotspotForLocation: getNearestHotspotForLocation
};
