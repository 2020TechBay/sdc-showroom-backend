const { isValidObjectId } = require('mongoose');
const CustomerService = require('../Services/CustomerService');
const router = require('express').Router();

// Secure the routes
router.use('/*', require('../Services/AuthService').verifyUser());

// Get customer info
router.get('/', (req, res) => {
    let user = req.user.toJSON();
    delete user._id; delete user.password; // Don't include _id and password fields
    res.send(user);
});

// Get all the requests a customer has made
router.get('/request', async (req, res, next) => {
    try {
        let results = await CustomerService.getRequests(req.user);
        res.send(results);
    }
    catch (err) {
        next(err);
    }
});

// Make a product request
router.post('/request', async (req, res, next) => {
    try {
        let { productID } = req.body;
        if (productID && isValidObjectId(productID)) {
            let success = await CustomerService.makeRequest(req.user, req.body);
            if (success) {
                res.status(200).send({ status: 'success' });
                return;
            }
        }
        res.status(400).send({
            status: 'fail',
            error: "invalid_product_id"
        });
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;