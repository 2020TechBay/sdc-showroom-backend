const {Schema, model}= require('mongoose')



const product = new Schema({
    id: {
        type: String,
        required: true
    },
    type: String,
    name: String,
    description :String
})

module.exports = model('Products', product)