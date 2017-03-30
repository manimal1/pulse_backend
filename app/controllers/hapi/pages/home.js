'use strict';

/**
 * @typedef {Object} homepageApi
 *  @param {Function} render, renders homepage
 */

/**
 * Homepage controller
 *
 * @param {Object} request, express request api
 * @param {object} reply, express response api
 */
function homeController( request, reply ) {
  if ( !request.auth.isAuthenticated ) {
    return reply.view( 'homepage/index', {title: 'Pulse App'} );
  }
  
  let user = request.auth.isAuthenticated ? {username : request.auth.credentials.name} : null;
  
  return reply.view( 'homepage/index', {title: 'Pulse App', user: user} );
}

/**
 * Exporting Public interface
 *
 * @type {homepageApi}
 */
module.exports = homeController;
