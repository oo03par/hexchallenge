'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    email: { type: String, required: true },
    forename: { type: String, required: false },
    surname: { type: String, required: false},
    createdAt: { type: Date, default: Date.now }
  }, 
  { 
    versionKey: false
  }
);

module.exports = mongoose.model('user', UserSchema);