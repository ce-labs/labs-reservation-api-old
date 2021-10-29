const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { getAllUsers, getSingleUser, getUserType, searchUsers, createUser, updateUser, setUserStatus, removeUser, getUserStatus } = require('../../components/users.component');

var jsonParser = bodyParser.json();

router.get('/all', getAllUsers);

router.get('/:userId', getSingleUser);

router.get('/userType/:userId', getUserType);

router.get('/userStatus/:userId', getUserStatus);

router.get('/search/:data', searchUsers);

router.post('/', jsonParser, createUser);

router.put('/:userId', jsonParser, updateUser);

router.put('/status/:userId', jsonParser, setUserStatus);

router.delete('/:userId', removeUser);

module.exports = router;