'use strict';

/**
 * Profile Api type declaration
 *
 * @typedef {Object} profileApi
 *  @param {Function} renderProfile renders user profile
 *  @param {Function} renderUpdateProfile updates and renders user profile
 */

/**
 * Render Profile Page
 *
 * @param {Object} request, hapi request object
 * @param {Function} reply, hapi reply interface
 * @returns {*}
 */
function renderProfile( request, reply ) {
  const User = request.server.plugins['hapi-mongo-models'].user;

  if ( !request.auth.isAuthenticated || request.method !== 'get' ) {
    return reply.redirect( '/' );
  }
  
  let user = {username : request.auth.credentials.username};

  User.findBy( 'username', user, ( result ) => {
    if ( result.records !== 1 ) {
      console.log( 'ERR : Can not retrieve Profile : ', result.records );
      return reply.redirect( '/' );
    }

    // Optional Logging for Debugging
    // console.log( 'INFO : LOGGING USER', result.data[ result.records - 1 ] );
    // console.log( result.data[ result.records - 1 ] );

    // TODO : fix result of records to be able to access property without the - 1 on records
    return reply.view( 'profile/index', {
      title: 'Pulse App',
      user: result.data[result.records - 1]
    } );

  } );
}

/**
 * Profile Controller Api
 *
 * @type {profileApi}
 */
module.exports = renderProfile;
