const express = require('express');
const router = express.Router();

const { userSignIn, getUserByID, getUserRecommendations } = require('../controllers/users');

router.post('/', userSignIn);
router.get('/:id', getUserByID);



module.exports = router;