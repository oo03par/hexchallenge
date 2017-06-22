'use strict';

let mongoose = require('mongoose');
let User = require('../models/user');

function getUsers(req, res) {
	User.find(function(err, users){
		if (err) res.send(err);
		res.json(users);
	});
};

module.exports = {getUsers}