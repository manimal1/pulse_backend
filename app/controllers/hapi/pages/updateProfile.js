'use strict';

/**
 * Profile Api type declaration
 *
 * @typedef {Object} profileApi
 *  @param {Function} renderProfile renders user profile
 *  @param {Function} renderUpdateProfile updates and renders user profile
 */

/**
 * Profile Controller Api
 *
 * @type {profileApi}
 */
module.exports = updateProfile;

function updateProfile( request, reply )
{
  const User = request.server.plugins[ 'hapi-mongo-models'].user;

  if ( !request.auth.isAuthenticated || request.method !== 'get' ) {
    return reply.redirect( '/' );
  }

  let user = {username : request.auth.credentials.username};

  User.findBy( 'username', user, ( result ) => {
    if ( result.records !== 1 ) {
      console.log( 'ERR : Can not retrieve Profile : ', result.records );
      return reply.redirect( '/' );
    }

    if ( request.method === 'get' ) {
      return reply.view( 'profile/update', {
        title: 'Pulse App',
        user: result.data[result.records - 1]
      });
    }

    if ( request.method === 'post' ) {
      let user = Object.assign( result.data[result.records - 1], request.payload );
      
      User.save( user );
      return reply.view( 'profile/index', {
        title: 'Pulse App',
        user: user
      });
    }
  } );
}


