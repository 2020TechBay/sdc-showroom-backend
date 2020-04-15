const { Router } = require('express');
const router = new Router();

// Get product requests
router.get('/requests', (req, res) => {
    res.send("Product Requests");
});

// Get notifications
router.get('/notifications', (req, res) => {
    res.send("Notifications");
});

// Respond to a product request
router.post('/respond', (req, res) => {
    res.send();
});

// Get reports
router.get('/reports', (req, res) => {
    res.send("Reports");
});

module.exports = router;