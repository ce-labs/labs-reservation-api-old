const express = require('express');
const { searchBlockades } = require('../../components/blockades.component');
const router = express.Router();
const { searchReservations } = require('../../components/reservations.component');


router.get('/reservations/search/:data', searchReservations);
router.get('/blockades/search/:data', searchBlockades);


module.exports = router;