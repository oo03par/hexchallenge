'use strict';

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('application', function() {
	it('should have a default ok request', function(done) {
		chai
			.request(app)
			.get('/')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			})
	});
});