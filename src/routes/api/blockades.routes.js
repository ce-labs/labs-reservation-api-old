const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const { getAllBlockades, getSingleBlockade, createBlockade, updateBlockade, removeBlockade } = require('../../components/blockades.component');

var jsonParser = bodyParser.json();

router.get('/all', getAllBlockades);

router.get('/:blockadeId', getSingleBlockade);

router.post('/', jsonParser, createBlockade);

router.put('/:blockadeId', jsonParser, updateBlockade);

router.delete('/:blockadeId', removeBlockade);

module.exports = router;