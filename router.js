const { Router } = require('express');
const router = new Router();

//  Define all the necessary routes here.
//  For example, the route 'GET /' will be defined as:
router.get('/', (req, res) => {
    res.send("Hello World!");
});



router.get('/products', (req, res) => {
    res.send()
})

router.get('/login', (req, res) => {
    
})


router.post('/signup', (req, res) => {
    
})


router.post('/request', (req, res) => {
    
})


router.get('/requests', (req, res) => {
    
})


router.get('/notifications', (req, res) => {
    
})



router.post('/customer', (req, res) => {
    
})


router.get('/reports', (req, res) => {
    
})













module.exports = router;