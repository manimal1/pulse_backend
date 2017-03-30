/* eslint camelcase: 0 */
var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var crypto = require( 'crypto' );
var passportLocalMongoose = require( 'passport-local-mongoose' );

var accountSchema = new Schema( {
  name: String,
  email: String,
  picture: {data: Buffer, contentType: String},
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    website: String
  },

  created_at: Date,
  updated_at: Date,

  provider: String,
  providerId: String,
  providerData: {},
  providerPicture: {data: Buffer, contentType: String}
} );

accountSchema.plugin( passportLocalMongoose );

/**
 * Adds Date on every Save
 */
accountSchema.pre( 'save', function( next ) {
  var currentDate = new Date();
  this.updated_at = currentDate;

  if ( !this.created_at ) {
    this.created_at = currentDate;
  }

  if ( this.password ) {
    var md5 = crypto.createHash( 'md5' );
    this.password = md5.update( this.password ).digest( 'hex' );
  }

  next();
} );

/**
 * Authenticates User
 *
 * @param {String} password
 * @returns {boolean}
 */
accountSchema.methods.authenticate = function( password ) {
  var md5 = crypto.createHash( 'md5' );
  md5 = md5.update( password ).digest( 'hex' );

  return this.password === md5;
};

/**
 * Finds Unique Username
 *
 * @param {String} username
 * @param {String} suffix
 * @param {Function} callback
 */
accountSchema.statics.findUniqueUsername = function( username, suffix, callback ) {
  var _this = this;
  var possibleUsername = username + ( suffix || '' );

  _this.findOne( {
      username: possibleUsername
    },
    function(err, user) {
      if (!err) {
        if (!user) {
          callback(possibleUsername);
        } else {
          return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
        }
      } else {
        callback(null);
      }
    }
  );
};

var Account = mongoose.model('Account', accountSchema);

module.exports = Account;
