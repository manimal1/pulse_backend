'use strict';

const BaseModel = require( 'hapi-mongo-models' ).BaseModel;
const Joi = require( 'joi' );

let uuid = 1;

let User = BaseModel.extend( {
  constructor: function( attrs ) {
    
    this.picture = '';
    this.name = '';
    this.username = '';
    this.email = '';
    // TODO : Read from Unique ID and increment
    this.sid = String( ++uuid );

    Object.assign( this, attrs );
  }
} );

User._collection = 'accounts';

User.schema = Joi.object().keys( {
  name: Joi.string().required(),
  email: Joi.string(),
  picture : Joi.string(),
  username : Joi.string().required(),
  password : Joi.string().required(),
  admin : Joi.boolean(),
  location : Joi.string(),
  meta : {
    age : Joi.number(),
    website : Joi.string()
  },
  created_at : Joi.string(),
  updated_at : Joi.string(),
  provider: Joi.string(),
  providerId: Joi.string(),
  providerData: {},
  providerPicture: Joi.string()
} );

/**
 * Checks for user values with the same name
 *
 * @param {Object} user created with constructor
 * @param {Function} callback for routes to handle the response
 */
User.insertUnique = ( user, callback ) => {
  if ( !user ) {
    console.log( 'no user passed' );
    callback( {message : 'No User Passed'} );
    return;
  }

  // Todo : use Find User by If possible
  User.find( {username : {$eq: user.username}}, ( err, result ) => {
    if ( err ) {
      console.log( err );
      callback( err );
      return;
    }

    if ( result.length > 0 ) {
      console.log( 'ERR : Duplicate User : ' + user.username );
      callback( {message : 'Username Exists '} );
      return;
    }

    User.insertOne( user, {}, ( err, result ) => {
      callback( err, result );
    } );
  } );
};

User.findBy = ( propertyName, user, callback ) => {
  let query = {};
  query[propertyName] = {$eq : user[propertyName]};
  
  // Debugging Log
  // console.log( query );

  User.find( query, ( err, result ) => {
    if ( err ) {
      console.log( 'ERR : finding user by : ', propertyName );
      return callback( err );
    }

    callback( {data : result, records : result.length} );
  } );
};


module.exports = User;
