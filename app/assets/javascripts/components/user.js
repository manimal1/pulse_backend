'use strict';

/**
 * Constructs A user
 *
 * @param {Number} id
 * @param {String} email
 * @param {Object} location
 *
 * @constructor
 */
function User(id, email, location) {
  this.id = id;
  this.email = email;
  this.location = location;
  this.previousLocations = [];
}

/**
 * Updates Users Location
 * @param newLoc
 */
User.prototype.updateLocation = function(newLoc) {
  this.previousLocations.push(this.location);
  this.location = newLoc;
};

/**
 * Gets Previous Location
 *
 * @returns {*}
 */
User.prototype.previousLocation = function() {
  return this.previousLocations[this.previousLocations.length - 1];
};

module.exports = User;
