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
