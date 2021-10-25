const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {res.send('Reservations Routes')});

module.exports = router;