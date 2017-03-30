var config = require('./');
var mongoose = require('mongoose');

/**
 * Sets Database configuration
 *
 * @returns {*}
 */
module.exports = function() {
  var db = mongoose.connect(config.db);
  require('../app/models/account');
  return db;
};
