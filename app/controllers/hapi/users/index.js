'use strict';

/**
 * User Controller for all actions relating to the user
 *
 * @typedef {Object} userApi
 *  @param {Function} login
 *  @param {Function} register
 *  @param {Function} logout
 */

/**
 * Public Api Users
 *
 * @type {userApi}
 */
module.exports = {
  login : require( './login' ),
  register : require( './register' ),
  logout : require( './logout' )
};


















