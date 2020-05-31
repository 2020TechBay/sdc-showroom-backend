const Customers = require('../Models/Customer');
const Products = require('../Models/Product');
const ProductRequests = require('../Models/ProductRequest');
const EmailService = require('./EmailService');

// Get product requests
function getRequests(officer) {
    let query = {};
    if (officer.role == "APM")
        query.type = "AssetRequest";
    else if (officer.role == "LPM")
        query.type = "LiabilityRequest";

    return ProductRequests.aggregate([
        { $match: query },
        {
            $lookup: {
                from: 'customers',
                let: { customerID: '$customerID' },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$customerID"] } } },
                    { $project: { _id: 0, password: 0 } }
                ],
                as: 'customer'
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
                id: "$_id",
                date: 1,
                customer: { $arrayElemAt: ["$customer", 0] },
                product: { $arrayElemAt: ["$product", 0] },
                response: 1
            }
        }
    ]);
}

async function respond(productRequestID, response) {
    let productRequest = await ProductRequests.findByIdAndUpdate(
        productRequestID,
        { $set: { response } }
    );
    if (productRequest) {
        // Notify customer through email
        Customers.findById(productRequest.customerID).then(async (customer) => {
            if (customer) {
                let product = await Products.findById(productRequest.productID);
                if (product) {
                    let message = "Dear Valued Customer,<br><br>";
                    message += `Your request for the <b>${product.name}</b> product has been responded to. Please open the SDC Showroom app to view the response. `;
                    message += `Thank you for patronizing our services.<br><br>`;
                    message += `Regards,<br>SDC Financial Limited.`
                    await EmailService.sendEmail("SDC Financial Limited", customer.email, "RESPONSE SENT", message, true);
                }
            }
        });

        return true;
    }
    return false;
}

module.exports = {
    getRequests,
    respond
};