const { Schema, model, SchemaTypes } = require('mongoose');

let schema = new Schema({
    // ID of the user this notification belongs to.
    userID: SchemaTypes.ObjectId,
    notifications: [
        new Schema({
            date: Date,
            title: String,
            message: String,
            seen: Boolean
        })
    ]
});

module.exports = model('Notification', schema, 'notifications');