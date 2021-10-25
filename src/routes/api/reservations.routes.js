const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { getAllReservations, getSingleReservation, createReservation, updateReservation, removeReservation } = require('../../components/reservations.component');

var jsonParser = bodyParser.json();

router.get('/all', getAllReservations);

router.get('/:reservationId', getSingleReservation);

router.post('/', jsonParser, createReservation);

router.put('/:reservationId', jsonParser, updateReservation);

router.delete('/:reservationId', removeReservation);

module.exports = router;