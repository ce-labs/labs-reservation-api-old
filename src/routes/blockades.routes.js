const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {res.send('Blockades Routes')});

module.exports = router;