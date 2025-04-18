const jwt = require('jsonwebtoken');
const secretkey = process.env.secretkey;

const Decoder = async (token) => {
    try {
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, secretkey, (err, decoded) => {
                if (err) reject(err);
                else resolve(decoded);
            });
        });
        return decoded;
    } catch (err) {
        throw new Error('Invalid token');
    }
};

module.exports = Decoder;
