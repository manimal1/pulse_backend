'use strict';

/**
 * Requires
 */
var passport = require('passport');
var controllers = require('../controllers');

/**
 * Handles Express Routes
 * - For Hapi routes look in ./app/controllers/hapi/routes
 *
 * @param {Object} app, express api
 */
module.exports = function(app) {

  app.get('/', controllers.homepage.render);

  app.route('/users').post(controllers.users.create)
      .get(controllers.users.list);

  app.param('userId', controllers.users.userByID);

  app.route('/users/:userId')
      .get(controllers.users.read)
      .put(controllers.users.update)
      .delete(controllers.users.deleteUser);

  app.route('/register')
      .get(controllers.users.renderRegister)
      .post(controllers.users.register);

  app.route('/login')
    .get(controllers.users.renderLogin)
    .post(passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    }));

  app.get('/logout', controllers.users.logout);

  app.get('/auth/facebook', passport.authenticate('facebook', {
    failureRedirect: '/login',
    scope: [
      'public_profile',
      'email',
      'user_friends'
    ]
  }));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/login',
    successRedirect: '/',
    scope: [
      'public_profile',
      'email',
      'user_friends'
    ]
  }));

  app.get('/profile', controllers.profile.renderProfile);

  app.route('/profile/update')
      .get(controllers.profile.renderUpdateProfile)
      .post(controllers.users.update);
};
