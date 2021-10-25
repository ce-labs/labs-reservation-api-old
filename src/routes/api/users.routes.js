const express = require('express');
const router = express.Router();
const { getAllUsers, getSingleUser } = require('../../components/users.component');

router.get('/all', getAllUsers);

router.get('/:userId', getSingleUser);

// create user

// modify user

// delete user


module.exports = router;