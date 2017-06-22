'use strict';

let mongoose = require('mongoose');
let User = require('../models/user');

function allUsers(req, res) {
	User.find(function(err, users){
		if (err) res.status(500).send(err);
		res.json(users);
	});
}

function readUser(req, res) {
	var id = req.params.id;
	if (mongoose.Types.ObjectId.isValid(id)) {
		User.findById(id, function(err, user) {
			if (err) res.status(500).send(err);
			if (user) {
				res.json(user);
			} else {
				res.status(404).send();
			}
		});
	} else {
		res.status(404).send();
	}
}

function createUser(req, res) {
	var body = req.body;
	var newUser = new User(body);
	newUser.save(function(err, user){
        if(err) res.status(500).send(err);
        res.status(201).json(user);
    });
}

function deleteUser(req, res) {
	var id = req.params.id;
	if (mongoose.Types.ObjectId.isValid(id)) {
		User.remove({_id:id}, function(err, user) {
			if (err) res.status(500).send(err);
			res.status(202).send();
		});
	} else {
		res.status(404).send();
	}	
}

function updateUser(req, res) {
	var id = req.params.id;
	var body = req.body;
	if (mongoose.Types.ObjectId.isValid(id)) {
		User.findById(id, function(err, found){
			if(err) res.status(500).send(err);
			if(found){
				Object.assign(found, body).save(function(err, saved) {
					if(err) res.status(500).send(err);
					res.json(saved);
				});
			} else {
				res.status(404).send();
			}
		});
	} else {
		res.status(404).send();
	}
}

function validate(req, res, next) {
	var body = req.body;
	var errors = [];
	if (!body.email) {
		errors.push({'error':'email is required field'});
	}

	if (body.forename && body.forename.length > 50) {
		errors.push({'error': 'forename must be less than 50 characters'});
	}

	if (body.surname && body.surname.length > 100) {
		errors.push({'error': 'surname must be less than 100 characters'});
	}

	if (errors.length > 0){
		res.status(400).send({'errors': errors});
	} else {
		next();
	}
}

module.exports = {allUsers, readUser, createUser, deleteUser, updateUser, validate}