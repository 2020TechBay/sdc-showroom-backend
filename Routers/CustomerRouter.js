const { Router } = require('express');
const router = new Router();

router.post('/request', (req, res) => {
    res.send("Send Product Request");
});

router.get('/notifications', (req, res) => {
    res.send("Notifications");
});

module.exports = router;