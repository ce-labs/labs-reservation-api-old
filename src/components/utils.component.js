const { getConnection } = require('../shared/connection');

// get all courses
const getCourses = (req, res) => {
    const databaseConnection = getConnection();
    databaseConnection.collection("coursesList").find({}, { projection: { _id: 0, courseId: 0 } } ).limit(20)
    .toArray(function(error, data) {
        if (error) {
            res.status(400).send('⛔️ An error occurred getting all users ... \n[Error]: ' + error);
        } else {
            res.status(200).send(data);
        }
      });
};

// get all labs
const getLabs = (req, res) => {
    const databaseConnection = getConnection();
    databaseConnection.collection("labsList").find({}, { projection: { _id: 0, courseId: 0 } } ).limit(20)
    .toArray(function(error, data) {
        if (error) {
            res.status(400).send('⛔️ An error occurred getting all users ... \n[Error]: ' + error);
        } else {
            res.status(200).send(data);
        }
      });
};

// get schedule data
const getScheduleData = (req, res) => {
    const databaseConnection = getConnection();
    databaseConnection.collection("scheduleData").find({}, { projection: { _id: 0, courseId: 0 } } ).limit(20)
    .toArray(function(error, data) {
        if (error) {
            res.status(400).send('⛔️ An error occurred getting all users ... \n[Error]: ' + error);
        } else {
            res.status(200).send(data);
        }
      });
};

// get schedule days
const getScheduleDays = (req, res) => {
    const databaseConnection = getConnection();
    databaseConnection.collection("scheduleDays").find({}, { projection: { _id: 0, courseId: 0 } } ).limit(20)
    .toArray(function(error, data) {
        if (error) {
            res.status(400).send('⛔️ An error occurred getting all users ... \n[Error]: ' + error);
        } else {
            res.status(200).send(data);
        }
      });
};


module.exports = { getCourses, getLabs, getScheduleData, getScheduleDays }