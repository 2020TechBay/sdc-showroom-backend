const AuthService = require('../Services/AuthService');
const { Router } = require('express');
const router = new Router();

// Get a token for accessing the protected APIs
router.post('/login', async (req, res, next) => {
    try {
        let result = await AuthService.login(req.body);
        res.send(result);
    }
    catch (err) {
        next(err); // Pass any error on to the error handler
    }
});

// Sign up as a customer
router.post('/signup', async (req, res, next) => {
    try {
        let result = await AuthService.signUp(req.body);
        if (!result.error)
            res.status(201).send(result);
        else {
            let statusCode;
            switch (result.error) {
                case "conflict":
                    statusCode = 409; // Conflict
                    break;
                default:
                    statusCode = 400; // Bad Request
                    break;
            }
            res.sendStatus(statusCode);
        }
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;