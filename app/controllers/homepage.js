'use strict';

/**
 * @typedef {Object} homepageApi
 *  @param {Function} render, renders homepage
 */

/**
 * Homepage controller
 *
 * @param {Object} req, express request api
 * @param {object} res, express response api
 */
function render(req, res) {
  res.render('homepage/index', {
    title: 'Pulse App',
    user: req.user
  });
}

/**
 * Exporting Public interface
 *
 * @type {homepageApi}
 */
module.exports = {
  render : render
};
