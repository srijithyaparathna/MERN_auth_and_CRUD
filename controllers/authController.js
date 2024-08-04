const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register new user
const register = async (req, res) => {
    const { email, password, role } = req.body;

    // Check if the user is logged in and has a role
    const requestRole = req.user ? req.user.role : null; // Adjusted to handle undefined requestUser

    try {
        // If the requester is not an admin and is trying to register an admin user
        if (requestRole !== 'admin' && role === 'admin') {
            return res.status(403).json({ message: "Only admins can register admin users." });
        }

        // Set the role based on the requester's role
        const newRole = requestRole === 'admin' ? role : 'user';
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            password: hashedPassword,
            role: newRole
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { register, login };
