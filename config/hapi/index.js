'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Requires
 */
const settings = require( './settings.json' );
const Path = require( 'path' );

/**
 * Path resolves to root / makes it relatively easy, for moving stuff around with requires
 */
const path = Path.resolve();

const Hapi = require( 'hapi' );
// const Bell = require( 'bell' );
// var passport = require('./config/passport')();
const jwt = require('jsonwebtoken');
const socketIo = require('socket.io');

const config = require( path + settings.config );

// TODO : Move this to Json Config // Or Not :) Not Sure yet
const server = new Hapi.Server( {
  connections: {
    routes: {
      files: {
        relativeTo: path + settings.assets
      }
    }
  }
} );

/**
 * Starts Server
 */
function startServer() {
  console.log( 'INFO : Starting Server : ... ' );

  server.start( ( err ) => {
    if ( err ) {
      console.log( err );
      return;
    }

    console.log( 'Info : Server Running at: ', server.info.uri );
  } );
}

/**
 * Registers Handler for serving public assets, with Inert Plugin
 */
function registerPublicAssets() {
  const routes = require( path + settings.routes );
  const Inert = require( 'inert' );

  console.log( 'INFO : Register Public Assets : ', settings.public );

  server.register( Inert, () => {
    console.log( 'Info : Starting Routes : ...' );
    routes( server );
  } );

  startServer();
}

/**
 * Registers Views with Vision Plugin
 */
function registerViews() {
  console.log( 'INFO : Register Views : ', 'Jade' );

  const Vision = require( 'vision' );

  server.register( Vision, ( err ) => {
    if ( err ) {
      server.log( err );
      return;
    }

    server.views( {
      engines: {jade: require( 'jade' )},
      path: path + settings.templates,
      compileOptions: {
        pretty: true
      }
    } );
  } );

  registerPublicAssets();
}

/**
 * Sets Authentication
 */
function registerAuthStrategies( ) {
	console.log( 'INFO : Register Auth Strategies : ' + 'Session Based' );
	const plugin = {
		register: require( 'hapi-auth-cookie' ),
		options: {}
	};

	let accounts = {
		123: {
			id: 123,
			user: 'john',
			fullName: 'John Q Public'
		}
	};

	let privateKey = 'BbZJjyoXAdr8BUZuiKKARWimKfrSmQ6fv8kZ7OFfc';
	let token = jwt.sign({ accountId: 123 }, privateKey, { algorithm: 'HS256'} );

	console.log( 'Signed token' );
	console.log( token );

	const tokenPlugin = {
		register : require( 'hapi-auth-jwt' ),
		options : {}
	};


	server.register(tokenPlugin.register, function ( error )
	{
		server.auth.strategy('token', 'jwt', {
			key: privateKey,
			validateFunc: function (request, decodedToken, callback) {

				console.log( 'decodedToken : Token based auth' );
				console.log( decodedToken );

				let error;
				let credentials = accounts[decodedToken.accountId] || {};

				if ( !credentials ) {
					return callback( error, false, credentials);
				}

				return callback( error, true, credentials)
			},
			verifyOptions: { algorithms: [ 'HS256' ] }  // only allow HS256 algorithm
		} );
	} );


  server.register( plugin, ( err ) => {
    if ( err ) {
      console.log( err );
      return;
    }

    const cache = server.cache( {segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000} );
    server.app.cache = cache;

    server.auth.strategy( 'session', 'cookie', true, {
      password: 'password-should-be-32-characters',
      cookie: 'sid-example',
      redirectTo: '/login',
      isSecure: false, // Make part of env variable // only for local development
      validateFunc: ( request, session, callback ) => {
        cache.get( session.sid, ( err, cached ) => {
          if ( err ) {
            return callback( err, false );
          }

          if ( !cached ) {
            return callback( null, false );
          }

          console.log( cached.account );

          return callback( null, true, cached.account );
        } );
      }
    } );
  } );

  registerViews();
}

/**
 * Sets Connection Settings
 */
function registerDatabase() {
  const plugin = {
    register: require( 'hapi-mongo-models' ),
    options: {
      mongodb: {
        url: config.db,
        options: {}
      },
      autoIndex: true,
      models: {
        user : path + settings.models + '/account'
      }
    }
  };

  // Log registerDatabase
  console.log( 'INFO : Register Database : ' + 'Mongo' );
  server.register( plugin, ( err ) => {
    if ( err ) {
      console.log( 'Failed loading plugin' );
    }
  } );

  registerAuthStrategies();
}

/**
 * Sets Connection Settings
 */
function registerConnections() {
  console.log( 'Info : Register connections : ' + config.port );
  server.connection( {port: config.port} );

  registerDatabase();

}

/**
 * Logs Startup Info
 */
function logPreStartupInfo() {
  // Lots of Logging
  console.log( 'Info : Config :' );
  // console.log( config );

  console.log( 'Info : Root Directory :' );
  // console.log( Path.resolve() );

  console.log( 'Info : Routes Location :' );
  // console.log( path + settings.routes );
}

/**
 * Initializes Server
 */
function init() {
    // TODO : Investigate Socket Use

    // Order of Function Calls
    logPreStartupInfo();
    registerConnections();

    var io = socketIo.listen(server.listener);

    io.sockets.on('connection', function (socket) {
        socket.emit({ msg: 'Socket IO says welcome' });
        console.log('Socket IO says welcome');
    });
}

/**
 * Server Public Interface
 *
 * @type {{init: init}}
 */
module.exports = {
  init : init
};
