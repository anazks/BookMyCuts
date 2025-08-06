const jwt = require('jsonwebtoken');
const secretkey = process.env.secretkey;


module.exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from the Authorization header

    if (!token) {
        return res.status(403).send('Token is required'); // No token provided
    }

    jwt.verify(token, secretkey, (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid token'); // Token is invalid
        }
        req.userId = decoded.id; // Store user ID in request for later use
        console.log("tokenvarified")
        next(); // Proceed to the next middleware or route handler
    });
};  