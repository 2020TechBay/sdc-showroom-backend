const mogoose = require('mongoose')

const schema = mogoose.Schema


const user = schema({
    id: {
        type: String,
        required: true
    },
    role: String,
    name: String,
    email: String,
    phoneNumber: String



})



module.exports = mogoose.model('Users', userSchema)


