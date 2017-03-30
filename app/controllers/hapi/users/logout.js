'use strict';

/**
 * Logs user out and redirects to home/login page
 *
 * @param {Object} request, express request api
 * @param {Object} response, express response api
 */
function logout( request, response ) {
  request.cookieAuth.clear();
  response.redirect( '/' );
}

module.exports = logout;

