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

module.exports = {getUsers, getUser}