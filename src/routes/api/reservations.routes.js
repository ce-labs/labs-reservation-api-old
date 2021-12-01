const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { getAllReservations, getSingleReservation, getSemesterReservations, getWeekReservations,createReservation, updateReservation, removeReservation, filterReservations } = require('../../components/reservations.component');

var jsonParser = bodyParser.json();

router.get('/all', getAllReservations);

router.get('/:reservationId', getSingleReservation);

router.get('/:year/:semester', jsonParser, getSemesterReservations);

router.get('/:year/:semester/:week', jsonParser, getWeekReservations);


router.get('/reservations/:data', filterReservations);

router.post('/', jsonParser, createReservation);

router.put('/:reservationId', jsonParser, updateReservation);

router.delete('/:reservationId', removeReservation);

module.exports = router;