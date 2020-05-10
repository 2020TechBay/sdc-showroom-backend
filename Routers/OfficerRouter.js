const { isValidObjectId } = require('mongoose');
const OfficerService = require('../Services/OfficerService');
const router = require('express').Router();

// Secure the routes
router.use('/*', require('../Services/AuthService').verifyUser(true));

// Get officer info
router.get('/', (req, res) => {
    let user = req.user.toJSON();
    delete user._id; delete user.password; // Don't include _id and password fields
    res.send(user);
});

// Get product requests
router.get('/requests', async (req, res) => {
    try {
        let results = await OfficerService.getRequests(req.user);
        res.send(results);
    }
    catch (err) {
        next(err);
    }
});

// Respond to a product request
router.post('/respond', async (req, res) => {
    try {
        let { productRequestID, response } = req.body;
        if (productRequestID && response && isValidObjectId(productRequestID) && (response.trim() != "")) {
            let success = await OfficerService.respond(productRequestID, response);
            if (success) {
                res.status(200).send({ status: 'success' });
                return;
            }
        }
        res.status(400).send({
            status: 'fail',
            error: "invalid_params"
        });
    }
    catch (err) {
        next(err);
    }
});

// Get reports
router.get('/reports', (req, res) => {
    res.send("Reports");
});

module.exports = router;