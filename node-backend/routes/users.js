const express = require('express');
const router = express.Router();

const { userSignIn, getUserByID } = require('../controllers/users');

router.post('/', userSignIn);
router.get('/:id', getUserByID);

module.exports = router;