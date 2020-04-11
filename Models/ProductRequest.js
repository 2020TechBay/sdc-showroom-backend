const { Schema, model, SchemaTypes } = require('mongoose');

const productRequest = new Schema({
    customerID: SchemaTypes.ObjectId,
    productID: SchemaTypes.ObjectId,
    response: String
})

module.exports = model('ProductRequest', productRequest, 'product_requests');