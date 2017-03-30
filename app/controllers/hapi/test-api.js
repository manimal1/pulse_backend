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
function testApi( request, reply ) {
	console.log( request.payload );
	var replyObj = {text: 'I am a JSON response, and you needed a token to get me.', credentials: request.auth.credentials};
	reply(replyObj);
}

module.exports = testApi;
