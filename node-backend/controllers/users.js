const User = require('../models/users');

exports.userSignIn = (req, res) => {
    const { name, password, phone, address } = req.body;
    if (!name || !password || !phone || !address) {
        return res.status(400).json({ message: 'missing fields' });
    }
    const userExists = User.getUserByName && User.getUserByName(trimmedName); 
    if (userExists) {
        return res.status(409).json({ message: 'Username is already taken' });
    }
    const user = User.createUser(name, password, phone, address);
    res.status(201).json(user);
}

exports.getUserByID = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 0) {
        return res.status(400).json({ message: 'invalid user ID' });
    }
    const user = User.getUserByID(id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'user not found' });
    }
}
