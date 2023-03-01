/*
=================================================================================
* Sistema de Reservación de Laboratorios CE - v1.0.0
=================================================================================
* Copyright 2022 ce-labs (https://github.com/ce-labs)
=================================================================================
* The above copyright notice and this permission notice shall 
  be included in all copies or substantial portions of the Software.
*/

const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const uriConnection =
  "mongodb+srv://admin:5yHmRkhs9N869S7r@cluster0.0iwr4.mongodb.net/labs-reservation?retryWrites=true&w=majority";
let database;

if (process.env.NODE_ENV == "test") {
  database = mongoose.connection;
} else {
  MongoClient.connect(
    uriConnection,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
      if (error) {
        console.log(
          "⛔️ An error occurred establishing connection ... \n[Error]: " +
            error
        );
        process.exit(0);
      }
      database = client.db("labs-reservation");
      console.log(
        "☑️  The server has successfully connected to the database ... "
      );
    }
  );
}

const getConnection = () => database;

module.exports = { getConnection };
