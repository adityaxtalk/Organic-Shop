const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization')
    if (!authHeader) {
        res.status(401).send({ message: 'Not Authenticated' })
    }

    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_KEY);
    } catch (error) {
        res.status(error.status).send(console.error.message)
    }
    if (!decodedToken) {
        res.status(401).send({ message: 'Not Authenticated' })
    }
    req.userId = decodedToken.userId;
    next()
}