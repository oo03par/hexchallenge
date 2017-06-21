'use strict';

const express = require('express')
const app = express()

let userController = require('./controllers/userController')

let port = 8080;

app.get('/', function (req, res) {
  res.send('Holiday Extras Remote Code Challenge')
})

app.listen(port, function () {
  console.log('Application running')
})

app
	.route("/user")
    .get(userController.getUsers);

module.exports = app // for testing