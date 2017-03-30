'use strict';

/**
 * Handles Login Login
 *  - If get, render static page
 *  - If post, validate input and add to db
 *
 * @param {Object} request
 * @param {Function} reply
 * @returns {*}
 */
function login( request, reply ) {
  if ( request.auth.isAuthenticated ) {
    console.log( 'INFO : Authorized User : ' );
    return reply.redirect( '/' );
  }

  if ( request.method === 'get' ) {
    return reply.view( 'login/login' );
  }

  let account = null;

  if ( request.method === 'post' ) {
    const User = request.server.plugins['hapi-mongo-models'].user;

    if ( !request.payload.username || !request.payload.password ) {
      return reply.view( 'login/login' );
    }

    let user = {username : request.payload.username, password: request.payload.password};

    // Debug Logging
    // console.log( 'Finding User by : Name', '...' );
    
    User.findBy( 'username', user, ( result ) => {
      if ( result.records !== 1 ) {
        console.log( 'INFO : Users Found : ', result.records );
        return reply.view( 'login/login' );
      }

      account = result.data[result.records - 1];

      if ( !account || account.password !== request.payload.password ) {
        console.log( 'INFO : Invalid Account Found : ', result.data );
        return reply.view( 'login/login' );
      }

      request.server.app.cache.set( account.sid, {account: account}, 0, ( err ) => {
        if ( err ) {
          console.log( 'ERROR : Saving User Session : ', err );
          return reply( err );
        }

        request.cookieAuth.set( {sid: account.sid} );
        return reply.redirect( '/' );
      } );
    } );
  }
}

module.exports = login;
