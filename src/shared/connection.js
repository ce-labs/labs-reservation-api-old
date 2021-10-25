const { MongoClient }  = require('mongodb');
const mongoose = require('mongoose');
const uriConnection = 'mongodb+srv://admin:HEvW1ASTiEx0Owzu@cluster0.0iwr4.mongodb.net/labs-reservation?retryWrites=true&w=majority';
let database; 

if (process.env.NODE_ENV == 'test'){
    database = mongoose.connection;
} else {
    MongoClient.connect(uriConnection, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if (error) {
            console.log('⛔️ An error occurred establishing connection ... \n[Error]: ' + error);
            process.exit(0);
        }
        database = client.db('labs-reservation');
        console.log('☑️  The server has successfully connected to the database ... ')
    });
}

const getConnection = () => database;

module.exports = { getConnection }