'use strict';

let express = require('express')
let app = express()
let mongoose = require('mongoose')
let bodyParser = require('body-parser');

let config = require('config')
let userController = require('./controllers/userController')

let port = config.port;

mongoose.connect(config.DBHost);

app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));

app.get('/', function (req, res) {
  res.send('Holiday Extras Remote Code Challenge')
});

app.route("/user")
	.get(userController.getUsers)
	.post(userController.createUser);

app.route("/user/:id")
	.get(userController.getUser)
	.delete(userController.deleteUser);

app.listen(port, function () {
  console.log('Application running')
});

module.exports = app // for testing