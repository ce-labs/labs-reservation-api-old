const { getConnection } = require('../shared/connection');
const { encrypt } = require('../shared/utils/security');
const { getFullDate, jsonConcat, setBlockadeId } = require('../shared/utils/utils')

const getAllBlockades = (req, res) => {
    const databaseConnection = getConnection();
    databaseConnection.collection("reservations").find({"type":"blockade"}, { projection: {  _id:0 } } ).limit(20)
    .toArray(function(error, data) {
        if (error) {
            res.status(400).send('⛔️ An error occurred getting all blockades ... \n[Error]: ' + error);
        } else {
            for(let i = 0; i < data.length; i++) {
                data[i].reservationId = encrypt(data[i].reservationId);
                data[i].description = encrypt(data[i].description);
                data[i].manager = encrypt(data[i].manager);
                data[i].creationAuthor = encrypt(data[i].creationAuthor);
                data[i].creationAuthorMail = encrypt(data[i].creationAuthorMail);
                data[i].modificationAuthor = encrypt(data[i].modificationAuthor);
                data[i].modificationAuthorMail = encrypt(data[i].modificationAuthorMail);
            } 
            res.status(200).send(data);
        }
      });
};

const getSingleBlockade = (req, res) => {
    let blockadeId = req.params.blockadeId;

    const databaseConnection = getConnection();
    databaseConnection.collection("reservations").findOne({"reservationId": blockadeId}, { projection: {  _id:0 } }, 
        function(error, data) {
            if (error) {
                res.status(400).send('⛔️ An error occurred getting single blockade ... \n[Error]: ' + error);
            } else {
                if(data === null){
                    res.status(404).send('⚠️ There are no blockades with the specified specifications ...');
                } else{
                    data.reservationId = encrypt(data.reservationId);
                    data.description = encrypt(data.description);
                    data.manager = encrypt(data.manager);
                    data.creationAuthor = encrypt(data.creationAuthor);
                    data.creationAuthorMail = encrypt(data.creationAuthorMail);
                    data.modificationAuthor = encrypt(data.modificationAuthor);
                    data.modificationAuthorMail = encrypt(data.modificationAuthorMail);
                    res.status(200).send(data);
                }
            }
      });
};

const getSemesterBlockades= (req, res) => {
    let currentYear = req.params.year;
    let currentSemester = req.params.semester;

    console.log(currentYear, currentSemester)

    const databaseConnection = getConnection();
    databaseConnection.collection("reservations").find({"type":"blockade", "year":currentYear, "semester":currentSemester}, { projection: {  _id:0 } } ).limit(20)
    .toArray(function(error, data) {
        if (error) {
            res.status(400).send('⛔️ An error occurred getting all reservations ... \n[Error]: ' + error);
        } else {
            for(let i = 0; i < data.length; i++) {
                data[i].reservationId = encrypt(data[i].reservationId);
                data[i].description = encrypt(data[i].description);
                data[i].manager = encrypt(data[i].manager);
                data[i].creationAuthor = encrypt(data[i].creationAuthor);
                data[i].creationAuthorMail = encrypt(data[i].creationAuthorMail);
                data[i].modificationAuthor = encrypt(data[i].modificationAuthor);
                data[i].modificationAuthorMail = encrypt(data[i].modificationAuthorMail);
            } 
            res.status(200).send(data);        }
      });
};

// search for matches within laboratory, scheduleSection, day
const searchBlockades = (req, res) => {
    var params = JSON.parse(req.params.data);
    var year = params.year;
    var semester = params.semester;
    var name = params.category;
    var regex = params.filter;
    var query;
    switch (name) {
        case "laboratory":
            query = {"type":"blockade","year": year, "semester": semester, "laboratory": new RegExp(regex) };
            break;
        case "scheduleSection":
            query = {"type":"blockade","year": year, "semester": semester, "scheduleSection": new RegExp(regex) };
            break;
        case "day":
            query = {"type":"blockade","year": year, "semester": semester, "day": new RegExp(regex) };
            break;
    }
    console.log(query);

    const databaseConnection = getConnection();
    databaseConnection.collection("reservations").find(query, { projection: {  _id:0 } } ).limit(20)
    .toArray(function(error, data) {
        if (error) {
            res.status(400).send('⛔️ An error occurred getting users ... \n[Error]: ' + error);
        } else {
            for(let i = 0; i < data.length; i++) {
                data[i].reservationId = encrypt(data[i].reservationId);
                data[i].description = encrypt(data[i].description);
                data[i].manager = encrypt(data[i].manager);
                data[i].creationAuthor = encrypt(data[i].creationAuthor);
                data[i].creationAuthorMail = encrypt(data[i].creationAuthorMail);
                data[i].modificationAuthor = encrypt(data[i].modificationAuthor);
                data[i].modificationAuthorMail = encrypt(data[i].modificationAuthorMail);
            } 
            res.status(200).send(data);        }
      });
}

const createBlockade = (req, res) => {
    let type = 'blockade';
    let year = req.body.year;
    let semester = req.body.semester;
    let week = 'all';
    let laboratory = req.body.laboratory;
    let day = req.body.day;
    let date = 'all';
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

    let blockadeId = setBlockadeId(laboratory, date, scheduleSection, day);


    var blockade = {
        reservationId: blockadeId,
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
    databaseConnection.collection('reservations').insertOne(blockade, (error, data) => {
        if(error) {
            res.status(400).send('⛔️ An error occurred creating blockade ... \n[Error]: ' + error);  
        } else {
            res.status(200).send('☑️ The blockade was created successfully ... ');
        }
    });
}


// the following data can be changed: description, manager, showDescription
const updateBlockade = (req, res) => {
    let blockadeId = req.params.blockadeId;
    let modificationDate = { modificationDate: getFullDate() };
    var jsonBodyAndModificationDate = jsonConcat(req.body, modificationDate)
    const databaseConnection = getConnection();
     
    var newData = { $set: jsonBodyAndModificationDate };

    databaseConnection.collection('reservations').updateOne({'reservationId': blockadeId}, newData, 
        function(error) {
            if(error) {
                res.status(400).send('⛔️ An error occurred updating blockade ... \n[Error]: ' + error);  
            } else {
                res.status(200).send('☑️ The blockade was modified successfully ... ');
            }
    });
}

const removeBlockade = (req, res) => {
    let blockadeId = req.params.blockadeId;

    const databaseConnection = getConnection();
    databaseConnection.collection('reservations').deleteMany({'reservationId': blockadeId}, 
        function(error) {
            if(error) {
                res.status(400).send('⛔️ An error occurred deleting reservation ... \n[Error]: ' + error);  
            } else {
                res.status(200).send('☑️ The reservation was deleted successfully ... ');
            }
    });
}


module.exports = { getAllBlockades, getSingleBlockade, getSemesterBlockades,searchBlockades, createBlockade, updateBlockade, removeBlockade }