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
  verifyUser,
  getRecoveryCode,
  verifyRecoveryCode,
  updatePassword,
} = require("../../components/auth.component");

var jsonParser = bodyParser.json();

router.post("/login", jsonParser, verifyUser);
router.post("/recover/code", jsonParser, getRecoveryCode);
router.post("/recover/verify", jsonParser, verifyRecoveryCode);
router.post("/recover/update", jsonParser, updatePassword);

module.exports = router;
