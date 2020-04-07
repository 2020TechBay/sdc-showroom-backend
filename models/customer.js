const mogoose = require('mongoose')

const schema = mogoose.Schema

const customer = schema({
    id: {
        type: String,
        required: true
    },
    extraInfo: String
})


module.exports = mogoose.model('Customers', customer)