const mogoose = require('mongoose')

const schema = mogoose.Schema


const productRequest = schema({
    id:{
        type: String,
        required: true
    },
    productID: String,
    extraInfo: String,
    response: String
})


module.exports = mogoose.model('Product_Requests', productRequest)

