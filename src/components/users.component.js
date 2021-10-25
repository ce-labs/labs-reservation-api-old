const { ObjectId } = require('bson');
const { getConnection } = require('../shared/connection');

const getAllUsers = (req, res) => {
    const databaseConnection = getConnection();
    databaseConnection.collection("users").find({}, { projection: { } } ).limit(20)
    .toArray(function(error, data) {
        if (error) {
            res.status(400).send('⛔️ An error occurred getting all users ... \n[Error]: ' + error);
        } else {
            res.status(200).send(data);
        }
      });
};

const getSingleUser = (req, res) => {
    let userId = req.params.userId;

    const databaseConnection = getConnection();
    databaseConnection.collection("users").findOne({"userId": userId}, { projection: { } }, 
        function(error, data) {
            if (error) {
                res.status(400).send('⛔️ An error occurred getting all users ... \n[Error]: ' + error);
            } else {
                res.status(200).send(data);
            }
      });
};

module.exports = { getAllUsers, getSingleUser }