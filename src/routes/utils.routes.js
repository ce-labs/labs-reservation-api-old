const express = require('express');
const router = express.Router();
const { getCourses, getLabs, getScheduleData, getScheduleDays } = require('../components/utils.component');

router.get('/courses', getCourses);

router.get('/labs', getLabs);

router.get('/scheduleData', getScheduleData);

router.get('/scheduleDays', getScheduleDays);

module.exports = router;