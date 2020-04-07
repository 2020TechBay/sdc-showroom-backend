const { Schema, model, SchemaTypes } = require('mongoose');

let schema = new Schema({
    // ID of the user this notification belongs to.
    userID: SchemaTypes.ObjectId,
    notifications: [
        new Schema({
            date: Date,
            // Add the other attributes here
        })
    ]
});

module.exports = model('Notification', schema, 'notifications');