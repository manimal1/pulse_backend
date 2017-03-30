'use strict';
var turf = require('turf');

/**
 * Creates A location
 *
 * @param {Number} lat
 * @param {Number} lng
 * @param {Number} timestamp
 * @constructor
 */
function Location(lat, lng, timestamp) {
  this.lat = lat;
  this.lng = lng;
  this.createdAt = timestamp || Date.now();
}

/**
 * Returns Latitute and Longitude of Array
 *
 * @returns {Array}
 */
Location.prototype.latLngArray = function() {
  return [this.lat, this.lng];
};

/**
 * Returns Location as object
 *
 * @returns {Object}
 */
Location.prototype.latLng = function() {
  return {
    lat: this.lat,
    lng: this.lng
  };
};

/**
 * Returns turfPoint of Location
 */
Location.prototype.turfPoint = function() {
  return turf.point([this.lng, this.lat], {
    location: this
  });
};

/**
 * Compares location to turfPoint?
 *
 * @param {Object} turfPoint
 * @returns {boolean}
 */
Location.prototype.compareToTurfPoint = function(turfPoint) {
  return this.lng === turfPoint.geometry.coordinates[0] && this.lng === turfPoint.geometry.coordinates[1];
};

/**
 * Returns nearest Location to passed paramater
 *
 * @param against
 * @returns {Object|null}
 */
Location.prototype.nearest = function(against) {
  var nearestTurfPoint = turf.nearest(this.turfPoint(), turf.featurecollection(against.map(function(againstLocation) {
    return againstLocation.turfPoint();
  })));

  return nearestTurfPoint ? nearestTurfPoint.properties.location : null;
};

Location.newFromArray = function(arr) {
  return new Location(arr[0], arr[1]);
};

module.exports = Location;
