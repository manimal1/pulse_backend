var passport = require('passport');
var url = require('url');
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../');
var users = require('../../app/controllers/users.js');

/**
 * Sets Facebook Auth Strategy
 */
module.exports = function() {
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
      // passReqToCallback: true,
    profileFields: ['id', 'displayName', 'emails']
  },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        // var providerData = profile._json;
        var providerData = {};
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;

        var providerUserProfile = {
          name: profile.displayName,
          email: profile.emails[0].value,
          username: profile.displayName,
          password: profile.displayName,
          provider: 'facebook',
          providerId: profile.id,
          providerData: providerData,
          providerPicture: profile.picture
        };

        users.saveOAuthUserProfile(providerUserProfile, done);
      });
    }));
};
