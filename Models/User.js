//Is there a need to model the User?
// This schema seems identical to the Officer schema

const {Schema, model} = require('mongoose')

const user = new Schema({
    userID: SchemaTypes.ObjectId,
    name: String,
    email: String,
    phoneNumber: String


})


module.exports = model('User', user)