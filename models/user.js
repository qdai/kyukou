'use strict';

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
  hash: {
    required: true,
    type: String
  },
  name: {
    required: true,
    type: String
  }
});

User.methods.verifyPassword = async function verifyPassword (password) {
  const match = await bcrypt.compare(password, this.hash);
  return match;
};

module.exports = mongoose.model('User', User);
