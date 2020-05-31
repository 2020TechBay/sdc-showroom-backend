const { Schema, model } = require('mongoose');

let schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    age: Number,
    nationality: String,
    nationalID: String
});

module.exports = model('Customer', schema, 'customers');