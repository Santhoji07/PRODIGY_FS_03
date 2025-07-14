const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User exists' });
    const user = await User.create({ name, email, password });
    res.status(201).json({ message: 'User registered' });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await user.matchPassword(password)) {
        res.json({ token: generateToken(user._id), user: { id: user._id, name: user.name, email: user.email } });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};