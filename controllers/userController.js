'use strict';

let mongoose = require('mongoose');
let User = require('../models/user');

function getUsers(req, res) {
	User.find(function(err, users){
		if (err) res.status(500).send(err);
		res.json(users);
	});
}

function getUser(req, res) {
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
	console.log('Request body is');
	console.log(body);
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

module.exports = {getUsers, getUser, createUser, deleteUser}