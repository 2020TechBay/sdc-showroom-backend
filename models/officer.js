const mogoose = require('mongoose')

const schema = mogoose.Schema


const officer = schema({
    id: {
        type: String,
        required: true
    },
    role: String
})


module.exports = mogoose.model('Officers', officer)


