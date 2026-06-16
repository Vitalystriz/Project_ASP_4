const crypto = require('crypto');

const users = [];

const createUser = (name, password, phone, address) => {
    const user = {
        id: crypto.randomUUID(),
        name: name,
        password: password,
        phone: phone,
        address: address,
        authorized: false
    };
    users.push(user);
    return user;
};

const getUserByID = (id) => {
    return users.find(user => user.id === id);
}

const authentication = (name, password) => {
    const user = users.find(user => user.name === name && user.password === password);
    if (user) {
        user.authorized = true;
        return user;
    }
    return null;
}

const isAuthorized = (id) => {
    user = users.find(user => user.id === id);
    return user.authorized
} 


module.exports = {
    createUser,
    getUserByID,
    authentication,
    isAuthorized
};