/**
 * Requires environment config from ./env folder
 * @type {Object} config based on node environment
 */
module.exports = require('./env/' + process.env.NODE_ENV + '.js');
