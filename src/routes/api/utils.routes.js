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
const {
  getCourses,
  getLabs,
  getScheduleData,
  getScheduleDays,
  getStaff,
  getUserTypes,
  getSemesterData,
} = require("../../components/utils.component");

router.get("/courses", getCourses);
router.get("/labs", getLabs);
router.get("/scheduleData", getScheduleData);
router.get("/scheduleDays", getScheduleDays);
router.get("/staff", getStaff);
router.get("/userTypes", getUserTypes);
router.get("/semester", getSemesterData);

module.exports = router;
