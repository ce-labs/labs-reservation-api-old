const express = require('express');
const router = express.Router();
const { getCourses } = require('../components/utils.component');

router.get('/courses', getCourses);

module.exports = router;