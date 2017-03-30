'use strict';

//const expect = require('chai').expect;
const request = require( 'request' );

describe('Hapi /login POST Request :', function() {
	it('Should return 200', function( done) {
		var profile = {
			name: 'string',
			email: 'a.l.kroneman@gmail.com',
			picture: {data: 'someURL', contentType: 'SOMECONTENTTYPE'},
			username: 'kroneman',
			password: 'password',
			admin: true,
			location: 'amsterdam',
			meta: {
				age: 24,
				website: 'localhost'
			},

			created_at: 1467923167110,
			updated_at: 1467923167110,

			provider: 'Facebook',
			providerId: 'Facebook?',
			providerData: {},
			providerPicture: {data: 'data', contentType: 'string'}
		};

		request.post( {
			uri : 'http://localhost:3000/api/login',
			method : 'POST',
			auth : {
				'bearer' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOjEyMywiaWF0IjoxNDY4NDM2Njc3fQ.tLPpx8bbeAUE3MbWQ3t_CUclH5teLZEG9_ld2EdmlMQ'
			},
			headers: [
				{
					name: 'content-type',
					value: 'application/json'
				}
			],
			body : JSON.stringify( profile )
		}, function(err, res) {
			if (err) {
				throw err;
			}
			// this is should.js syntax, very clear
			res.should.have.status(200);
			done();
		} );
	});
});
