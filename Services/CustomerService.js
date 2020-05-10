const Products = require('../Models/Product');
const ProductRequests = require('../Models/ProductRequest');
const Officers = require('../Models/Officer');
const EmailService = require('./EmailService');

// Get all the product requests made by the specified customer
function getRequests(customer) {
    return ProductRequests.aggregate([
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
        await ProductRequests.create({
            date: new Date(),
            type: product.type + 'Request',
            customerID: customer._id,
            productID: product._id
        });

        // Send an email notification to the appropriate officers
        Officers.aggregate([
            {
                $match: {
                    role: (product.type == "Asset" ? "APM" : "LPM")
                }
            },
            {
                $group: {
                    _id: null,
                    emails: { $push: "$email" }
                }
            }
        ]).then(async (result) => {
            if (result.length > 0) {
                let message = "Hello SDC Officer,<br><br>";
                message += `A customer just made a request for the <b>${product.name}</b> product. Please check and respond accordingly.<br><br>`;
                message += `Customer Name: <b>${customer.name}</b><br>`;
                message += `Customer Email: <b>${customer.email}</b>`;
                await EmailService.sendEmail('SDC Showroom Server', result[0].emails.join(','), "NEW PRODUCT REQUEST", message, true);
            }
        });

        return true;
    }
    return false;
}

module.exports = {
    getRequests,
    makeRequest
};