const mogoose = require('mongoose')

const schema = mogoose.Schema

const product = schema({
    id: {
        type: String,
        required: true
    },
    type: String,
    name: String,
    description :String
})

module.exports = mogoose.model('Products', product)