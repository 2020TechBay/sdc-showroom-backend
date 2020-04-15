const { Router } = require('express');
const router = new Router();

// Get a token for accessing the protected APIs
router.get('/login', (req, res) => {
    res.send("Login");
});

// Sign up as a customer
router.post('/signup', (req, res) => {
    res.send();
});

module.exports = router;