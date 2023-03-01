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
  getAllUsers,
  getSingleUser,
  searchUsers,
  createUser,
  updateUser,
  setUserStatus,
  removeUser,
  getReservationsNumber,
} = require("../../components/users.component");

var jsonParser = bodyParser.json();

router.get("/all", getAllUsers);
router.get("/:userId", getSingleUser);
router.get("/reservations/:userId", getReservationsNumber);
router.get("/search/:data", searchUsers);
router.post("/", jsonParser, createUser);
router.put("/:userId", jsonParser, updateUser);
router.put("/status/:userId", jsonParser, setUserStatus);
router.delete("/:userId", removeUser);

module.exports = router;
