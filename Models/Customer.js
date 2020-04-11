const { Schema, model } = require('mongoose');

let schema = new Schema({
    name: String,
    email: String,
    password: String,
    phoneNumber: String
    // Might add extra information later...
});

module.exports = model('Customer', schema, 'customers');