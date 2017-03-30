'use strict';

/**
 * User Controller for all actions relating to the user
 *
 * @typedef {Object} userApi
 *  @param {Function} create
 *  @param {Function} list
 *  @param {Function} read
 *  @param {Function} userByID
 *  @param {Function} update
 *  @param {Function} deleteUser
 *  @param {Function} renderLogin
 *  @param {Function} renderRegister
 *  @param {Function} register
 *  @param {Function} logout
 *  @param {Function} saveOAuthUserProfile
 */

// var User = require('mongoose').model('Account');
var User = require('../models/account');
var passport = require('passport');
var validator = require('validator');

/**
 * Create a new user
 *
 * @param {Object} req, express request api
 * @param {Object} res, express response api
 * @param {Function} next
 */
function create(req, res, next) {
  var user = new User(req.body);
  // if (validator.isEmail(req.body)) {
  //   user = new User(req.body);
  // }

  user.save(function(err) {
    if (err) {
      return next(err);
    }

    res.json(user);
  });
}

/**
 *
 * @param {Object} req, express request api
 * @param {Object} res, express response api
 * @param next
 */
function list(req, res, next) {
  User.find({}, function(err, users) {
    if (err) {
      return next(err);
    }

    res.json(users);
  });
}

/**
 *
 * @param {Object} req, express request api
 * @param {Object} res, express response api
 */
function read(req, res) {
  res.json(req.user);
}

/**
 *
 * @param {Object} req, express request api
 * @param {Object} res, express response api
 * @param next
 * @param id
 */
function userByID(req, res, next, id) {
  User.findOne({
      _id: id
    },
    function(err, user) {
      if (err) {
        console.log(err);
        return next(err);
      } else {
        req.user = user;
        // if user is found
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        });
         // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
        console.log(token);
        next();
      }
    }
  );
}

/**
 *
 * @param {Object} req, express request api
 * @param {Object} res, express response api
 * @param next
 */
function update(req, res, next) {
  User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
    if (err) {
      return next(err);
    }

    res.json(user);
    return res.redirect('/profile');
  });
}

/**
 *
 * @param {Object} req, express request api
 * @param {Object} res, express response api
 * @param next
 */
function deleteUser(req, res, next) {
  req.user.remove(function(err) {
    if (err) {
      return next(err);
    }

    res.json(req.user);
  });
}

/**
 * Returns error message from err object
 *
 * @param {object} err
 * @returns {string} message
 */
var getErrorMessage = function(err) {
  var message = '';
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) {
        message = err.errors[errName].message;
      }
    }
  }

  return message;
};

/**
 *
 * @param {Object} req, express request api
 * @param {Object} res, express response api
 * @param next
 */
function renderLogin(req, res, next) {
  if (!req.user) {
    res.render('login/login', {
      title: 'Log-in Form',
      messages: req.flash('error') || req.flash('info')
    });
  } else {
    return res.redirect('/');
  }
}

/**
 * Renders A registered user
 *
 * @param {Object} req, express request api
 * @param {Object} res, express response api
 * @param next
 */
function renderRegister(req, res, next) {
  if (!req.user) {
    res.render('login/register', {
      title: 'Register Form',
      messages: req.flash('error')
    });
  } else {
    return res.redirect('/');
  }
}

/**
 * Registers A new User
 *
 * @param {Object} req, express request api
 * @param {Object} res, express response api
 * @param next
 */
function register(req, res, next) {
  if (!req.user) {
    var user = new User(req.body);
    var message = null;

    user.provider = 'local';
    user.save(function(err) {
      if (err) {
        console.log('registration error for ' + req.body.username + ' ' + req.body.password + ' ', err);
        var message = getErrorMessage(err);
        req.flash('error', message);
        return res.redirect('/register');
      }

      req.login(user, function(err) {
        if (err) {
          return next(err);
        }

        return res.redirect('/');
      });
    });
  } else {
    return res.redirect('/');
  }
}

/**
 * Logs user out and redirects to home/login page
 *
 * @param {Object} req, express request api
 * @param {Object} res, express response api
 */
function logout(req, res) {
  req.logout();
  res.redirect('/');
}

/**
 * Saves Auth to user profile
 *
 * @param {Object} profile
 * @param {Function} done
 */
function saveOAuthUserProfile(profile, done) {
  User.findOne({
      provider: profile.provider,
      providerId: profile.providerId
    },
    function(err, user) {
      if (err) {
        return done(err);
      } else {
        if (!user) {
          var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');

          User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
            profile.username = availableUsername;
            user = new User(profile);

            user.save(function(err) {
              if (err) {
                // var message = getErrorMessage(err);
                // req.flash('error', message);
                // return res.redirect('/login');
                req.flash('error', 'sorry, an error occurred');
                console.log(err);
              }

              return done(err, user);
            });
          });
        } else {
          return done(err, user);
        }
      }
    }
  );
}

/**
 * Public Api Users
 *
 * @type {userApi}
 */
module.exports = {
  create : create,
  list : list,
  read : read,
  userByID : userByID,
  update : update,
  deleteUser : deleteUser,
  renderLogin : renderLogin,
  renderRegister : renderRegister,
  register : register,
  logout : logout,
  saveOAuthUserProfile : saveOAuthUserProfile
};
