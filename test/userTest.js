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

describe('User Controller', function() {
	describe('All users endpoint', function() {
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

	describe('Get existing user endpoint', function() {
		it('should return a 404 when user is not found', function(done) {
			chai
				.request(app)
				.get('/user/wibble')
				.end((err, res) => {
					res.should.have.status(404);
					done();
				});
		});

		it('should return the correct user details when requested', function(done) {
			let user0 = new User({email:"zero@example.com", forename:"Zero", surname:"Noone"});

			user0.save();

			let id = user0._id;

			chai
				.request(app)
				.get('/user/' + id)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.email.should.be.eql(user0.email);
					res.body.forename.should.be.eql(user0.forename);
					res.body.surname.should.be.eql(user0.surname);
					done();
				});
		});
	});

	describe('Add new user endpoint', function() {
		it('should add a new user and return 201', function(done) {
			let user = {email:"new.user@example.com", forename:"New", surname:"User"};
		
			chai
				.request(app)
				.post('/user')
				.send(user)
				.end((err, res) => {
					res.should.have.status(201);
					res.body.should.be.a('object');
					res.body.email.should.be.eql(user.email);
					res.body.forename.should.be.eql(user.forename);
					res.body.surname.should.be.eql(user.surname);
					res.body.should.have.property('_id');
					done();
				});
		});
	});

	describe('Delete existing user endpoint', function() {
		it('should return a 404 when the user is not found', function(done) {
			chai
				.request(app)
				.delete('/user/wibble')
				.end((err, res) => {
					res.should.have.status(404);
					done();
				});
		});

		it('should return 202 for existing user', function(done) {
			let user = new User({email:"deleteme@example.com", forename:"Delete", surname:"Me"});

			user.save();

			let id = user._id;

			chai
				.request(app)
				.delete('/user/' + id)
				.end((err, res) => {
					res.should.have.status(202);
					done();
				});		
		});

		it('should delete existing user', function(done) {
			let user = new User({email:"deleteme@example.com", forename:"Delete", surname:"Me"});

			user.save();

			let id = user._id;

			chai
				.request(app)
				.delete('/user/' + id)
				.end((err, res) => {
					User.findById(id, function(err, found) {
						if (!found) done();
					});
				});		
		});
	});
});