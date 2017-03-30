'use strict';

const Path = require( 'path' );
const path = Path.resolve();
const settings = require( path + '/config/hapi/settings.json' );

const controllers = require( path + settings.controllers );

/**
 * Registers Routes
 *
 * - Serves -- /app/assets see paths.json in the root directory
 * @param {Object} server, hapi server instance
 *
 */
function handlers( server ) {

  /**
   * Handles Static Files

   */
  server.route( [
    {
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: '.',
          redirectToSlash: true,
          index: true
        }
      },
      config : {
        auth : false,
        description : 'Serve Frontend Assets'
      }
    },
    {
      method: ['GET', 'POST'],
      path: '/login',
      config: {
        handler: controllers.users.login,
        description : 'Handles get and post for Login',
        auth: {mode: 'try'},
        plugins: {
          'hapi-auth-cookie': {redirectTo: false}
        }
      }
    },
    {
      method: 'GET',
      path: '/',
      config: {
        auth: {mode: 'try'},
        handler:  controllers.home,
        description : 'Render HomePage'
      }
    },
    {
      method: 'GET',
      path: '/logout',
      config: {
        handler: controllers.users.logout
      }
    },
    {
      method: ['GET', 'POST'],
      path: '/register',
      config: {
        auth: false,
        handler: controllers.users.register
      }
    },
    {
      method: ['GET'],
      path: '/profile',
      config: {
        auth: {mode: 'optional'},
        handler: controllers.renderProfile
      }
    },
    {
      method: ['GET', 'POST'],
      path: '/profile/update',
      config: {
        auth: {mode: 'optional'},
        handler: controllers.updateProfile
      }
    },
	{
      method: ['GET', 'POST'],
      path: '/api/login',
      config: {
          auth: {
              strategy : 'token',
              mode: 'optional'
          },
          handler: controllers.testApi
      }
	}

  ] );

}

module.exports = handlers;

// TODO : See what from these routes still need to be implemented
// app.route('/profile/update')
//   .get(controllers.profile.renderUpdateProfile)
//   .post(controllers.users.update);

// app.route('/users').post(controllers.users.create)
//   .get(controllers.users.list);

// app.param('userId', controllers.users.userByID);

// app.route('/users/:userId')
//   .get(controllers.users.read)
//   .put(controllers.users.update)
//   .delete(controllers.users.deleteUser);

// app.get('/auth/facebook', passport.authenticate('facebook', {
//   failureRedirect: '/login',
//   scope: [
//     'public_profile',
//     'email',
//     'user_friends'
//   ]
// }));

// app.get('/auth/facebook/callback', passport.authenticate('facebook', {
//   failureRedirect: '/login',
//   successRedirect: '/',
//   scope: [
//     'public_profile',
//     'email',
//     'user_friends'
//   ]
// }));
