/*
=================================================================================
* Sistema de Reservación de Laboratorios CE - v1.0.0
=================================================================================
* Copyright 2022 ce-labs (https://github.com/ce-labs)
=================================================================================
* The above copyright notice and this permission notice shall 
  be included in all copies or substantial portions of the Software.
*/

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const {
  getAllReservations,
  getSingleReservation,
  getSemesterReservations,
  getWeekReservations,
  createReservation,
  updateReservation,
  removeReservation,
  filterReservations,
} = require("../../components/reservations.component");

var jsonParser = bodyParser.json();

router.get("/all", getAllReservations);
router.get("/filter/:data", filterReservations);
router.get("/:reservationId", getSingleReservation);
router.get("/:year/:semester", jsonParser, getSemesterReservations);
router.get("/:year/:semester/:week", jsonParser, getWeekReservations);
router.post("/", jsonParser, createReservation);
router.put("/:reservationId", jsonParser, updateReservation);
router.delete("/:reservationId", removeReservation);

module.exports = router;
