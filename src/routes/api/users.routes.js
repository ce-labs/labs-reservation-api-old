const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { getAllUsers, getSingleUser, createUser, updateUser, setUserStatus, removeUser } = require('../../components/users.component');

var jsonParser = bodyParser.json();

router.get('/all', getAllUsers);

router.get('/:userId', getSingleUser);

router.post('/', jsonParser, createUser);

router.put('/:userId', jsonParser, updateUser);

router.put('/status/:userId', jsonParser, setUserStatus);

router.delete('/:userId', removeUser);

module.exports = router;