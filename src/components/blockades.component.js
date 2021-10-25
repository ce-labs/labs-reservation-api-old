const { getConnection } = require('../shared/connection');
const { getFullDate, jsonConcat, setReservationId } = require('../shared/utils/utils')

const getAllBlockades = (req, res) => {
    const databaseConnection = getConnection();
    databaseConnection.collection("reservations").find({"type":"blockade"}, { projection: { } } ).limit(20)
    .toArray(function(error, data) {
        if (error) {
            res.status(400).send('⛔️ An error occurred getting all blockades ... \n[Error]: ' + error);
        } else {
            res.status(200).send(data);
        }
      });
};

const getSingleBlockade = (req, res) => {
    let blockadeId = req.params.blockadeId;

    const databaseConnection = getConnection();
    databaseConnection.collection("reservations").findOne({"reservationId": blockadeId}, { projection: { } }, 
        function(error, data) {
            if (error) {
                res.status(400).send('⛔️ An error occurred getting single blockade ... \n[Error]: ' + error);
            } else {
                if(data === null){
                    res.status(404).send('⚠️ There are no blockades with the specified specifications ...');
                } else{
                    res.status(200).send(data);
                }
            }
      });
};



module.exports = { getAllBlockades, getSingleBlockade }