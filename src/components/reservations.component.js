const { getConnection } = require('../shared/connection');
const { getFullDate, jsonConcat, setReservationId } = require('../shared/utils/utils')

const getAllReservations = (req, res) => {
    const databaseConnection = getConnection();
    databaseConnection.collection("reservations").find({"type":"reservation"}, { projection: { } } ).limit(20)
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
    databaseConnection.collection("reservations").findOne({"reservationId": reservationId}, { projection: { } }, 
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
    databaseConnection.collection("reservations").find({"type":"reservation", "year":currentYear, "semester":currentSemester}, { projection: { } } ).limit(20)
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
    databaseConnection.collection("reservations").find(query, { projection: { } } ).limit(20)
    .toArray(function(error, data) {
        if (error) {
            res.status(400).send('⛔️ An error occurred getting users ... \n[Error]: ' + error);
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

    let reservationId = setReservationId(laboratory, date, scheduleSection);


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
    databaseConnection.collection('reservations').insertOne(reservation, (error, data) => {
        if(error) {
            res.status(400).send('⛔️ An error occurred creating reservation ... \n[Error]: ' + error);  
        } else {
            res.status(200).send('☑️ The reservation was created successfully ... ');
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


module.exports = { getAllReservations, getSingleReservation, getSemesterReservations, searchReservations, createReservation, updateReservation, removeReservation }