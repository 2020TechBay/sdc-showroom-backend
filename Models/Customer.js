const { Schema, model } = require('mongoose');

let schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true }
    // Might add extra information later...
});

module.exports = model('Customer', schema, 'customers');