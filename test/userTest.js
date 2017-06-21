'use strict';

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('User Controller - All users', function() {
	it('should return empty array when there are no users', function(done) {
		chai
			.request(app)
			.get('/user')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.length.should.be.eql(0);
				done();
			})
	});
});