const express = require('express');
const router = express.Router();
const { getCourses, getLabs } = require('../components/utils.component');

router.get('/courses', getCourses);

router.get('/labs', getLabs);

module.exports = router;