const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send('Token required');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send("Invalid token");
        }
        req.user = user; // Attach the user to the request object
        next();
    });
};

const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send('Admin access required');
    }
    next();
};

module.exports = { authMiddleware, adminMiddleware };
