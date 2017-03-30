'use strict';
var map = L.map('map');

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'coderzen.pea2fncl',
  accessToken: 'pk.eyJ1IjoiY29kZXJ6ZW4iLCJhIjoiY2lsdnp1c3I4MDA5ZnVvbTR3ZGJwZ2diYiJ9.IY5Ft0-JPC0Euf4_dlQybQ'
}).addTo(map);

/**
 * Location found handler
 *
 * @param {Object} e
 */
function onLocationFound(e) {
  var radius = e.accuracy / 2;

  L.marker(e.latlng).addTo(map)
    .bindPopup('You are within ' + radius + ' meters from this point').openPopup();

  L.circle(e.latlng, radius).addTo(map);
}

/**
 * Location not found
 *
 * @param {Object} e, event object
 */
function onLocationError(e) {
  alert(e.message);
}

map.locate({setView: true, maxZoom: 16});
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
