const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const { getAllBlockades, getSingleBlockade } = require('../../components/blockades.component');

var jsonParser = bodyParser.json();

router.get('/all', getAllBlockades);

router.get('/:blockadeId', getSingleBlockade);


module.exports = router;