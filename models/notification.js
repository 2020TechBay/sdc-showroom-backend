const mogoose = require('mongoose')

const schema = mogoose.Schema


const notification = schema({

id:{
    type: String,
    required: true
},
userID: String,
date: Date,
title: String,
message: String,
seen: String

})


module.exports = mogoose.model('Notifications', notification)