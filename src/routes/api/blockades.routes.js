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
  getAllBlockades,
  getSingleBlockade,
  createBlockade,
  updateBlockade,
  removeBlockade,
  getSemesterBlockades,
  searchBlockades
} = require("../../components/blockades.component");

var jsonParser = bodyParser.json();

router.get("/all", getAllBlockades);
router.get("/:blockadeId", getSingleBlockade);
router.get("/:year/:semester", jsonParser, getSemesterBlockades);
router.get("/:year/:semester/:laboratory", jsonParser, searchBlockades);
router.post("/", jsonParser, createBlockade);
router.put("/:blockadeId", jsonParser, updateBlockade);
router.delete("/:blockadeId", removeBlockade);

module.exports = router;
