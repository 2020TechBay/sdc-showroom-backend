const jwt = require('jsonwebtoken');
const Customers = require('../Models/Customer');
const Officers = require('../Models/Officer');
const bcrypt = require('bcryptjs');

// Generate a token used to access protected API routes
function createToken(user_id, user_type) {
    return jwt.sign({ user_id, user_type }, process.env.JWT_KEY);
}

async function login({ user_type, email, password }) {
    // Check if a user with the specified email exists in the database
    let collection = (user_type == 'officer' ? Officers : Customers);
    let user = await collection.findOne({ email });
    if (!user)
        return { error: 'invalid_email' };
    else {
        // Verify whether the password is correct
        if (bcrypt.compareSync(password, user.password))
            return { token: createToken(user.id, user_type) };
        else
            return { error: 'wrong_password' };
    }
}

async function signUp(userInfo) {
    try {
        // Encrypt password for security reasons...
        userInfo.password = bcrypt.hashSync(userInfo.password);
        // Store info in the database
        let customer = await Customers.create(userInfo);
        // Create and return the access token for this customer
        return { token: createToken(customer.id, 'customer') };
    }
    catch (err) {
        let error;
        switch (err.name) {
            case "MongoError":
                error = "conflict"; // Another user with the same email already exists
                break;
            default:
                error = "invalid_params"; // Invalid parameters specified
                break;
        }
        return { error };
    }
}

// Express middleware used to prevent unauthorized access to protected endpoints.
// It extracts the access token from the request headers and checks if it's valid.
// Valid tokens are allowed through, while invalid tokens are blocked.
function verifyUser(isCustomer = true) {
    return async (req, res, next) => {
        try {
            // Extract the token from the authorization header of the request
            // Authorization header should be of the form 'Bearer <token>'
            // So to get the token, we cut off the 'Bearer ' part.
            let token = req.headers.authorization.substring(7);

            // Decode the token to get the user information stored in it
            let { user_id, user_type } = jwt.verify(token, process.env.JWT_KEY, { ignoreExpiration: true });

            // Check if the decoded information is valid
            let collection = (user_type == 'officer' ? Officers : Customers);
            let user = await collection.findById(user_id);
            if (!user) {
                // User not found in database
                res.sendStatus(401);
                return;
            }

            // Pass the loaded user information on to the next middleware function to handle the request
            req.user = user;
            next();
        }
        catch  {
            res.sendStatus(401); // Unauthorized
        }
    }
}

module.exports = { login, signUp, verifyUser };