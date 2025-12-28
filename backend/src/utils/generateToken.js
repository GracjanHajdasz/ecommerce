const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    const payLoad = { id: userId };
    const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    })

    return token;
}

module.exports = generateToken;