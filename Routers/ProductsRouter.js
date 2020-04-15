const { Router } = require('express');
const router = new Router();

// Get products
router.get('/', (req, res) => {
    res.send("Products");
});

module.exports = router;