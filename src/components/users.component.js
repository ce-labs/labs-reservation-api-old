const { getConnection } = require('../shared/connection');
const { getFullDate, jsonConcat } = require('../shared/utils/utils')

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
                res.status(400).send('⛔️ An error occurred getting single users ... \n[Error]: ' + error);
            } else {
                if(data === null){
                    res.status(404).send('⚠️ There are no users with the specified specifications ...');
                } else{
                    res.status(200).send(data);
                }
            }
      });
};

const createUser = (req, res) => {
    let userId = req.body.userId;
    let password = req.body.password;
    let userType = req.body.userType;
    let userStatus = 'active';
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let mail = req.body.mail;
    let phone = req.body.phone;
    let creationAuthor = req.body.creationAuthor;
    let creationDate = getFullDate();
    let modificationAuthor = '';
    let modificationDate = '';

    var user = {
        userId: userId,
        password: password,
        userType: userType,
        userStatus: userStatus,
        firstName: firstName,
        lastName: lastName,
        mail: mail,
        phone: phone,
        creationAuthor: creationAuthor,
        creationDate: creationDate,
        modificationAuthor: modificationAuthor,
        modificationDate: modificationDate
    };

    const databaseConnection = getConnection();
    databaseConnection.collection('users').insertOne(user, (error, data) => {
        if(error) {
            res.status(400).send('⛔️ An error occurred creating users ... \n[Error]: ' + error);  
        } else {
            res.status(200).send('☑️ The user was created successfully ... ');
        }
    });
}

// the following data can be changed: firstName, password, lastName, userType, email, phone
const updateUser = (req, res) => {
    let userId = req.params.userId;
    let modificationDate = { modificationDate: getFullDate() };
    var jsonBodyAndModificationDate = jsonConcat(req.body, modificationDate)
    const databaseConnection = getConnection();
     
    var newData = { $set: jsonBodyAndModificationDate };

    databaseConnection.collection('users').updateOne({'userId': userId}, newData, 
        function(error) {
            if(error) {
                res.status(400).send('⛔️ An error occurred updating users ... \n[Error]: ' + error);  
            } else {
                res.status(200).send('☑️ The user was modified successfully ... ');
            }
    });
}

const setUserStatus = (req, res) => {
    let userId = req.params.userId;
    const databaseConnection = getConnection();
     
    var newData = { $set: req.body };

    databaseConnection.collection('users').updateOne({'userId': userId}, newData, 
        function(error) {
            if(error) {
                res.status(400).send('⛔️ An error occurred updating users ... \n[Error]: ' + error);  
            } else {
                res.status(200).send('☑️ The user status was modified successfully ... ');
            }
    });
}

const removeUser = (req, res) => {
    let userId = req.params.userId;

    const databaseConnection = getConnection();
    databaseConnection.collection('users').deleteMany({'userId': userId}, 
        function(error) {
            if(error) {
                res.status(400).send('⛔️ An error occurred deleting users ... \n[Error]: ' + error);  
            } else {
                res.status(200).send('☑️ The user was deleted successfully ... ');
            }
    });
}


module.exports = { getAllUsers, getSingleUser, createUser, updateUser, setUserStatus, removeUser }