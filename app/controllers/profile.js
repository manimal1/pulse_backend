'use strict';

/**
 * Profile Api type declaration
 *
 * @typedef {Object} profileApi
 *  @param {Function} renderProfile renders user profile
 *  @param {Function} renderUpdateProfile updates and renders user profile
 */

/**
 * Profile controller to render existing profile
 *
 * @param {Object} req, express request api
 * @param {object} res, express response api
 */
function renderProfile(req, res) {
  res.render('profile/index', {
    title: 'Pulse App',
    user: req.user
  });
}

/**
 * Profile controller to update and render existing profile
 *
 * @param {Object} req, express request api
 * @param {object} res, express response api
 */
function renderUpdateProfile(req, res) {
  res.render('profile/update', {
    title: 'Pulse App',
    user: req.user
  });
  
  return res.redirect('/profile');
}

/**
 * Profile Controller Api
 *
 * @type {profileApi}
 */
module.exports = {
  renderProfile : renderProfile,
  renderUpdateProfile : renderUpdateProfile
};
