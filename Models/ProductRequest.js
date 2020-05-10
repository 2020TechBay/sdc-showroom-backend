const { Schema, model, SchemaTypes } = require('mongoose');

const productRequest = new Schema({
    date: Date,
    customerID: SchemaTypes.ObjectId,
    productID: SchemaTypes.ObjectId,
    response: { type: String, default: 'N/A' }
})

module.exports = model('ProductRequest', productRequest, 'product_requests');