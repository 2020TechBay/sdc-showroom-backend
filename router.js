const { Router } = require('express');
const router = new Router();

//  Define all the necessary routes here.
//  For example, the route 'GET /' will be defined as:
router.get('/', (req, res) => {
    res.send("Hello World!");
});
// You can run the project and open http://localhost:2020 in your browser to see it in action :)

/*  
    Now define the following routes:
    GET  /products
    GET  /login
    POST /signup
    POST /request
    GET  /notifications
    GET  /customer
    GET  /requests
    GET  /reports
*/


module.exports = router;