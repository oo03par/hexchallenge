'use strict';

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
let User = require('../models/user')

var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();
 
var Mockgoose = require('mockgoose').Mockgoose;
var mockgoose = new Mockgoose(mongoose);

chai.use(chaiHttp);

before(function(done) {
    mockgoose.prepareStorage().then(function() {
        mongoose.connect('mongodb://localhost:27017/TestingDB', function(err) {
            done(err);
        });
    });
});

describe('User Controller - All users', function() {
	beforeEach(function(done) {
		User.remove({}, (err) => {
			done();
		})
	});

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

 	it('should return a list of users that have been added to the data store', function(done) {
		let user0 = new User({email:"zero@example.com", forename:"Zero", surname:"Noone"});
		let user1 = new User({email:"one@example.com", forename:"One", surname:"Someone"});

		user0.save();
		user1.save();

		chai
			.request(app)
			.get('/user')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.length.should.be.eql(2);
				res.body[0].should.be.a('object');
				res.body[0].email.should.be.eql(user0.email);
				res.body[0].forename.should.be.eql(user0.forename);
				res.body[0].surname.should.be.eql(user0.surname);
				res.body[1].should.be.a('object');
				res.body[1].email.should.be.eql(user1.email);
				res.body[1].forename.should.be.eql(user1.forename);
				res.body[1].surname.should.be.eql(user1.surname);
	 			done();
	 		});
	});
});