const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { verifyUser } = require('../../components/auth.component')

var jsonParser = bodyParser.json();

router.post('/login', jsonParser, verifyUser);

module.exports = router;