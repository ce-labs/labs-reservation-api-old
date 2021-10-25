const { getConnection } = require('../shared/connection');

const getAllReservations = (req, res) => {
    const databaseConnection = getConnection();
    databaseConnection.collection("reservations").find({"type":"reservation"}, { projection: { } } ).limit(20)
    .toArray(function(error, data) {
        if (error) {
            res.status(400).send('⛔️ An error occurred getting all users ... \n[Error]: ' + error);
        } else {
            res.status(200).send(data);
        }
      });
};

const getSingleReservation = (req, res) => {
    let reservationId = req.params.reservationId;

    const databaseConnection = getConnection();
    databaseConnection.collection("reservations").findOne({"reservationId": reservationId}, { projection: { } }, 
        function(error, data) {
            if (error) {
                res.status(400).send('⛔️ An error occurred getting single users ... \n[Error]: ' + error);
            } else {
                if(data === null){
                    res.status(404).send('⚠️ There are no reservations with the specified specifications ...');
                } else{
                    res.status(200).send(data);
                }
            }
      });
};

const createReservation = (req, res) => {

}

// the following data can be changed: 
const updateReservation = (req, res) => {
    
}

const removeReservation = (req, res) => {

}


module.exports = { getAllReservations, getSingleReservation, createReservation, updateReservation, removeReservation }