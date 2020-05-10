const Products = require('../Models/Product');
const ProductRequest = require('../Models/ProductRequest');

// Get all the product requests made by the specified customer
function getRequests(customer) {
    return ProductRequest.aggregate([
        {
            $match: {
                customerID: customer._id
            }
        },
        {
            $lookup: {
                from: 'products',
                let: { productID: '$productID' },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$productID"] } } },
                    { $project: { _id: 0 } }
                ],
                as: 'product'
            }
        },
        {
            $project: {
                _id: 0,
                date: 1,
                product: { $arrayElemAt: ["$product", 0] },
                response: 1
            }
        }
    ]);
}

// Make a product request
async function makeRequest(customer, productID) {
    let product = await Products.findById(productID);
    if (product) {
        let pr = new ProductRequest({
            date: new Date(),
            customerID: customer._id,
            productID: product._id
        });
        await pr.save();
        return true;
    }
    return false;
}

module.exports = {
    getRequests,
    makeRequest
};