var rbush = require('rbush');
var tree;

function init() {
  tree = rbush(9);
}

function rbushBounds(minLatLng, maxLatLng, obj) {
  var bounds = [minLatLng.lng, minLatLng.lat, maxLatLng.lng, maxLatLng.lat];
  if (obj) {
    bounds.push(obj);
  }
  return bounds;
}

function add(obj) {
  tree.insert(rbushBounds(obj.location, obj.location, obj));
}

function get(minLatLng, maxLatLng) {
  return tree.search(rbushBounds(minLatLng, maxLatLng)).map(function(rbushBounds) {
    return rbushBounds[4];
  });
}

function getAll() {
  return tree.all();
}

var store = {
  init: init,
  add: add,
  get: get,
  getAll: getAll
};

module.exports = store;
