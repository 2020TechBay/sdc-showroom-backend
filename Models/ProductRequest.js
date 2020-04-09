const {Schema, model,SchemaTypes} = require('mongoose')



const productRequest = new Schema({

    userID: SchemaTypes.ObjectId,

        product:[new Schema({
        productID: String,
        extraInfo: String,
        response: String
    })]
})


module.exports = model('ProductRequests', productRequest)