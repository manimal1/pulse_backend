'use strict';


/**
 * Registers A new User, will need to split between strategies and clean this up
 *
 * @param {Object} request
 * @param {Object} reply
 */
function register( request, reply ) {
  if ( request.auth.isAuthenticated ) {
    return request.redirect( '/' );
  }

  if ( request.method === 'get' ) {
    return reply.view( 'login/register', {title: 'Register Form'} );
  }

  if ( request.method === 'post' ) {
    const User = request.server.plugins['hapi-mongo-models'].user;
    const user = new User( request.payload );

    // Logging Creation of User
    // console.log( user );

    // Set Provider to Local
    user.provider = 'local';

    User.insertUnique( user, ( err, result ) => {
      if ( err ) {
        console.log( 'ERR : Inserting Unique User : ', err );
        return reply.view( 'login/register', {err : err} );
      }

      if ( !result ) {
        console.log( 'ERR inserting Unique Record' );
        return reply.redirect( '/login' );
      }

      request.server.app.cache.set( result.sid, {account: result}, 0, ( err ) => {
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

module.exports = register;
