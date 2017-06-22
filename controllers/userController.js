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

module.exports = {allUsers, readUser, createUser, deleteUser, updateUser}