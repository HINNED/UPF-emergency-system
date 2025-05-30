const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token is not valid.' });
        }

        req.user = decoded;
        next();
    });
};

const isAdmin = (req, res, next) => {
    User.findById(req.user.id)
        .then(user => {
            if (user.role !== 'admin') {
                return res.status(403).json({ message: 'Access denied, admin only.' });
            }
            next();
        })
        .catch(err => res.status(500).json({ message: 'Server error.' }));
};

module.exports = {
    authMiddleware,
    isAdmin
};