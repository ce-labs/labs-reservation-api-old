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
