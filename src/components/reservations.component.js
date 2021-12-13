const { getConnection } = require('../shared/connection');
const { encrypt } = require('../shared/utils/security');
const { getFullDate, jsonConcat, setReservationId } = require('../shared/utils/utils')

const getAllReservations = (req, res) => {
    const databaseConnection = getConnection();
    databaseConnection.collection("reservations").find({"type":"reservation"}, { projection: { _id:0 } } ).limit(20)
    .toArray(function(error, data) {
        if (error) {
            res.status(400).send('⛔️ An error occurred getting all reservations ... \n[Error]: ' + error);
        } else {
            res.status(200).send(data);
        }
      });
};

const getSingleReservation = (req, res) => {
    let reservationId = req.params.reservationId;

    const databaseConnection = getConnection();
    databaseConnection.collection("reservations").findOne({"reservationId": reservationId}, { projection: {  _id:0 } }, 
        function(error, data) {
            if (error) {
                res.status(400).send('⛔️ An error occurred getting single reservation ... \n[Error]: ' + error);
            } else {
                if(data === null){
                    res.status(404).send('⚠️ There are no reservations with the specified specifications ...');
                } else{
                    res.status(200).send(data);
                }
            }
      });
};

const getSemesterReservations = (req, res) => {
    let currentYear = req.params.year;
    let currentSemester = req.params.semester;

    const databaseConnection = getConnection();
    databaseConnection.collection("reservations").find({"type":"reservation", "year":currentYear, "semester":currentSemester}, { projection: {  _id:0 } } ).limit(20)
    .toArray(function(error, data) {
        if (error) {
            res.status(400).send('⛔️ An error occurred getting all reservations ... \n[Error]: ' + error);
        } else {
            res.status(200).send(data);
        }
      });
};

const getWeekReservations = (req, res) => {
    let currentYear = req.params.year;
    let currentSemester = req.params.semester;
    let week = req.params.week;

    const databaseConnection = getConnection();
    databaseConnection.collection("reservations").find({"type":"reservation", "year":currentYear, "semester":currentSemester, "week": week}, { projection: {  _id:0 } } ).limit(20)
    .toArray(function(error, data) {
        if (error) {
            res.status(400).send('⛔️ An error occurred getting all reservations ... \n[Error]: ' + error);
        } else {
            res.status(200).send(data);
        }
      });
};


// search for matches within laboratory, scheduleSection, week, date
const searchReservations = (req, res) => {
    var params = JSON.parse(req.params.data);
    var year = params.year;
    var semester = params.semester;
    var week = params.week;
    var laboratory = params.laboratory;
    var query = {"year": year, "semester": semester, "week": week, "laboratory": laboratory}
    console.log(query);

    const databaseConnection = getConnection();
    databaseConnection.collection("reservations").find(query, { projection: {  _id:0 } } ).limit(20)
    .toArray(function(error, data) {
        if (error) {
            res.status(400).send('⛔️ An error occurred getting users ... \n[Error]: ' + error);
        } else {
            res.status(200).send(data);
        }
      });
}

const filterReservations = (req, res) => {
    console.log('qasdasdasd');
    var params = JSON.parse(req.params.data);
    console.log(params)
    var year = params.year;
    var semester = params.semester;
    var name = params.category;
    var regex = params.filter;
    var query;
    switch (name) {
        case "laboratory":
            query = {"type":"reservation","year": year, "semester": semester, "laboratory": new RegExp(regex) };
            break;
        case "scheduleSection":
            query = {"type":"reservation","year": year, "semester": semester, "scheduleSection": new RegExp(regex) };
            break;
        case "week":
            query = {"type":"reservation","year": year, "semester": semester, "week": new RegExp(regex) };
            break;
        case "date":
            query = {"type":"reservation","year": year, "semester": semester, "date": new RegExp(regex) };
            break;
    }
    console.log(query);

    const databaseConnection = getConnection();
    databaseConnection.collection("reservations").find(query, { projection: {  _id:0 } } ).limit(20)
    .toArray(function(error, data) {
        if (error) {
            res.status(400).send('⛔️ An error occurred getting reservations ... \n[Error]: ' + error);
        } else {
            res.status(200).send(data);
        }
      });
}

const createReservation = (req, res) => {
    let type = 'reservation';
    let year = req.body.year;
    let semester = req.body.semester;
    let week = req.body.week;
    let laboratory = req.body.laboratory;
    let day = req.body.day;
    let date = req.body.date;
    let scheduleSection = req.body.scheduleSection;
    let description = req.body.description;
    let manager = req.body.manager;
    let showDescription = req.body.showDescription;
    let creationAuthor = req.body.creationAuthor;
    let creationAuthorMail = req.body.creationAuthorMail;
    let creationDate = getFullDate();
    let modificationAuthor = '';
    let modificationAuthorMail = '';
    let modificationDate = '';

    let reservationId = setReservationId(year, semester, laboratory, date, scheduleSection, day);


    var reservation = {
        reservationId: reservationId,
        type: type,
        year: year,
        semester: semester,
        week: week,
        laboratory: laboratory,
        day: day,
        date: date,
        scheduleSection: scheduleSection,
        description: description,
        manager: manager,
        showDescription: showDescription,
        creationAuthor: creationAuthor,
        creationAuthorMail: creationAuthorMail,
        creationDate: creationDate,
        modificationAuthor: modificationAuthor,
        modificationAuthorMail: modificationAuthorMail,
        modificationDate: modificationDate
    };

    const databaseConnection = getConnection();
    databaseConnection.collection("reservations").findOne({"reservationId": reservationId}, { projection: { _id:0 } }, 
        function(error, data) {
            if (error) {
                res.status(400).send('⛔️ An error occurred getting single reservation ... \n[Error]: ' + error);
            } else {
                if(data === null){                       

                    databaseConnection.collection("reservations").findOne({"year":year,"semester":semester,"day":day,"scheduleSection":scheduleSection}, (error, data) => {
                        if(error){ res.status(400).send('⛔️ An error occurred getting blockades ... \n[Error]: ' + error); }
                        else {
                            if(data === null){
                                    databaseConnection.collection('reservations').insertOne(reservation, (error, data) => {
                                    if(error){
                                        res.status(400).send('⛔️ An error occurred creating reservation ... \n[Error]: ' + error);  
                                    } else {
                                        res.status(200).send('☑️ The reservation was created successfully ... ');
                                    }
                                    });
                            } else {
                                res.status(401).send('⚠️ There is a blockade in specified schedule section ...');
                            }
                        }

                    })


                } else if(data !== null){
                    res.status(401).send('⚠️ There is a reservation with the given id ...');
                }
            }
      });
}

// the following data can be changed: description, manager, showDescription
const updateReservation = (req, res) => {
    let reservationId = req.params.reservationId;
    let modificationDate = { modificationDate: getFullDate() };
    var jsonBodyAndModificationDate = jsonConcat(req.body, modificationDate)
    const databaseConnection = getConnection();
     
    var newData = { $set: jsonBodyAndModificationDate };

    databaseConnection.collection('reservations').updateOne({'reservationId': reservationId}, newData, 
        function(error) {
            if(error) {
                res.status(400).send('⛔️ An error occurred updating reservation ... \n[Error]: ' + error);  
            } else {
                res.status(200).send('☑️ The reservation was modified successfully ... ');
            }
    });
}

const removeReservation = (req, res) => {
    let reservationId = req.params.reservationId;

    const databaseConnection = getConnection();
    databaseConnection.collection('reservations').deleteMany({'reservationId': reservationId}, 
        function(error) {
            if(error) {
                res.status(400).send('⛔️ An error occurred deleting reservation ... \n[Error]: ' + error);  
            } else {
                res.status(200).send('☑️ The reservation was deleted successfully ... ');
            }
    });
}


module.exports = { getAllReservations, getSingleReservation, getSemesterReservations, getWeekReservations,filterReservations, searchReservations, createReservation, updateReservation, removeReservation }