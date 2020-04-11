const { Schema, model } = require('mongoose');

const product = new Schema({
    type: { type: String, enum: ['Asset', 'Liability'] },
    name: String,
    description: String
});

module.exports = model('Product', product, 'products')