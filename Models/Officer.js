const { Schema, model } = require('mongoose');

let schema = new Schema({
    // This property represents the role of the officer. 
    // Could be either Customer, Asset Product Manager, Liability Product Manager or Administrator.
    role: { type: String, enum: ['Admin', 'APM', 'LPM',] },
    name: String,
    email: String,
    password: String,
    phoneNumber: String
});

module.exports = model('Officer', schema, 'officers');