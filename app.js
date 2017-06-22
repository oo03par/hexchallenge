'use strict';

let express = require('express')
let app = express()
let mongoose = require('mongoose')

let config = require('config')
let userController = require('./controllers/userController')

let port = config.port;

mongoose.connect(config.DBHost);

app.get('/', function (req, res) {
  res.send('Holiday Extras Remote Code Challenge')
});

app.route("/user").get(userController.getUsers);
app.route("/user/:id").get(userController.getUser);

app.listen(port, function () {
  console.log('Application running')
});

module.exports = app // for testing