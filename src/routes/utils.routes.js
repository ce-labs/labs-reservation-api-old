const express = require('express');
const router = express.Router();
const { getCourses, getLabs, getScheduleData } = require('../components/utils.component');

router.get('/courses', getCourses);

router.get('/labs', getLabs);

router.get('/scheduleData', getScheduleData);

module.exports = router;