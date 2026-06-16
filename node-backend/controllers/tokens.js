const User = require('../models/users');

exports.userLogin = (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
        return res.status(400).json({ message: 'missing fields' });
    }
    const user = User.authentication(name, password);
    if (user) {
        res.json(user);
    } else {
        res.status(401).json({ message: 'authentication failed' });
    }
};
