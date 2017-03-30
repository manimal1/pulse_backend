'use strict';

/**
 * Creates a Hotspot
 *
 * @param {Number} id
 * @param {String} type
 * @param {Number} location
 * @constructor
 */
function Hotspot(id, type, location) {
  this.id = id;
  this.type = type;
  this.location = location;
}

/**
 * Gets Hotspot Radius
 */
Hotspot.prototype.getRadius = function() {

};

/**
 * Gets Users within radius ?
 * Pass Hotspot ?
 */
Hotspot.prototype.getUsers = function() {
  var hotspotUsers = [];

  if (User in hotspotRadius) {
    hotspotUsers.push(User);
  }
};

module.exports = Hotspot;
