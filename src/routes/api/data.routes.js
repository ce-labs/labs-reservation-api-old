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
const { searchBlockades } = require("../../components/blockades.component");
const router = express.Router();
const {
  searchReservations,
} = require("../../components/reservations.component");

router.get("/reservations/search/:data", searchReservations);
router.get("/blockades/search/:data", searchBlockades);

module.exports = router;
