const { getConnection } = require('../shared/connection');
const { encrypt } = require('../shared/utils/security');

const getCourses = (req, res) => {
    const databaseConnection = getConnection();
    databaseConnection.collection("coursesList").find({}, { projection: { _id:0 } } ).limit(20)
    .toArray(function(error, data) {
        if (error) {
            res.status(400).send('⛔️ An error occurred getting courses data ... \n[Error]: ' + error);
        } else {
            res.status(200).send(data);
        }
      });
};

const getLabs = (req, res) => {
    const databaseConnection = getConnection();
    databaseConnection.collection("labsList").find({}, { projection: {  _id:0 } } ).limit(20)
    .toArray(function(error, data) {
        if (error) {
            res.status(400).send('⛔️ An error occurred getting labs data ... \n[Error]: ' + error);
        } else {
            res.status(200).send(data);
        }
      });
};

const getScheduleData = (req, res) => {
    const databaseConnection = getConnection();
    databaseConnection.collection("scheduleData").find({}, { projection: {  _id:0 } } ).limit(20)
    .toArray(function(error, data) {
        if (error) {
            res.status(400).send('⛔️ An error occurred getting schedule data ... \n[Error]: ' + error);
        } else {
            res.status(200).send(data);
        }
      });
};

const getScheduleDays = (req, res) => {
    const databaseConnection = getConnection();
    databaseConnection.collection("scheduleDays").find({}, { projection: {  _id:0 } } ).limit(20)
    .toArray(function(error, data) {
        if (error) {
            res.status(400).send('⛔️ An error occurred getting days ... \n[Error]: ' + error);
        } else {
            res.status(200).send(data);
        }
      });
};

const getStaff = (req, res) => {
    const databaseConnection = getConnection();
    databaseConnection.collection("staff").find({}, { projection: { _id:0 } } ).limit(20)
    .toArray(function(error, data) {
        if (error) {
            res.status(400).send('⛔️ An error occurred getting staff  ... \n[Error]: ' + error);
        } else {
            for(let i = 0; i < data.length; i++) {
                data[i].name = encrypt(data[i].name);
            } 
            res.status(200).send(data);
        }
      });
};

const getUserTypes = (req, res) => {
    const databaseConnection = getConnection();
    databaseConnection.collection("userTypes").find({}, { projection: {  _id:0} } ).limit(20)
    .toArray(function(error, data) {
        if (error) {
            res.status(400).send('⛔️ An error occurred getting user types ... \n[Error]: ' + error);
        } else {
            res.status(200).send(data);
        }
      });
};

const getSemesterData = (req, res) => {
    const databaseConnection = getConnection();
    databaseConnection.collection("semester").find({}, { projection: { _id:0 } } ).limit(20)
    .toArray(function(error, data) {
        if (error) {
            res.status(400).send('⛔️ An error occurred getting courses data ... \n[Error]: ' + error);
        } else {
            res.status(200).send(data);
        }
      });
};

module.exports = { getCourses, getLabs, getScheduleData, getScheduleDays, getStaff, getUserTypes, getSemesterData }