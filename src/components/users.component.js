/*
=================================================================================
* Sistema de Reservación de Laboratorios CE - v1.0.0
=================================================================================
* Copyright 2022 ce-labs (https://github.com/ce-labs)
=================================================================================
* The above copyright notice and this permission notice shall 
  be included in all copies or substantial portions of the Software.
*/

const { getConnection } = require("../shared/connection");
const { getFullDate, jsonConcat } = require("../shared/utils/utils");
const { generateRandomPassword } = require("../shared/utils/security");
const { transporter } = require("../shared/mailer");

const getAllUsers = (req, res) => {
  const databaseConnection = getConnection();
  databaseConnection
    .collection("users")
    .find({}, { projection: { _id: 0 } })
    .limit(20)
    .toArray(function (error, data) {
      if (error) {
        res
          .status(400)
          .send(
            "⛔️ An error occurred getting all users ... \n[Error]: " + error
          );
      } else {
        res.status(200).send(data);
      }
    });
};

const getSingleUser = (req, res) => {
  let userId = req.params.userId;

  const databaseConnection = getConnection();
  databaseConnection
    .collection("users")
    .findOne(
      { userId: userId },
      { projection: { _id: 0 } },
      function (error, data) {
        if (error) {
          res
            .status(400)
            .send(
              "⛔️ An error occurred getting single users ... \n[Error]: " +
                error
            );
        } else {
          if (data === null) {
            res
              .status(404)
              .send("⚠️ There are no users with the given specifications ...");
          } else {
            res.status(200).send(data);
          }
        }
      }
    );
};

const getReservationsNumber = (req, res) => {
  let userId = req.params.userId;

  const databaseConnection = getConnection();
  databaseConnection
    .collection("users")
    .findOne(
      { userId: userId },
      { projection: { _id: 0 } },
      function (error, data) {
        if (error) {
          res
            .status(400)
            .send(
              "⛔️ An error occurred getting single users ... \n[Error]: " +
                error
            );
        } else {
          if (data === null) {
            res
              .status(404)
              .send("⚠️ There are no users with the given specifications ...");
          } else {
            res.status(200).send(data.reservations);
          }
        }
      }
    );
};

// search for matches within firstName, lastName, userId, userType
const searchUsers = (req, res) => {
  var params = JSON.parse(req.params.data);
  var name = params.category;
  var regex = params.filter;
  var query;
  switch (name) {
    case "firstName":
      query = { firstName: new RegExp(regex) };
      break;
    case "lastName":
      query = { lastName: new RegExp(regex) };
      break;
    case "userId":
      query = { userId: new RegExp(regex) };
      break;
    case "userType":
      query = { userType: new RegExp(regex) };
      break;
  }
  console.log(query);

  const databaseConnection = getConnection();
  databaseConnection
    .collection("users")
    .find(query, { projection: { _id: 0 } })
    .limit(20)
    .toArray(function (error, data) {
      if (error) {
        res
          .status(400)
          .send("⛔️ An error occurred getting users ... \n[Error]: " + error);
      } else {
        res.status(200).send(data);
      }
    });
};

const createUser = (req, res) => {
  let userId = req.body.userId;
  let password = generateRandomPassword();
  let userType = req.body.userType;
  let userStatus = "active";
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let mail = req.body.mail;
  let phone = req.body.phone;
  let creationAuthor = req.body.creationAuthor;
  let creationDate = getFullDate();
  let modificationAuthor = "";
  let modificationDate = "";
  let reservations = "0";

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
    modificationDate: modificationDate,
    reservations: reservations,
  };

  var mailOptions = {
    from: "celabscr@gmail.com",
    to: mail,
    subject:
      "[SISTEMA DE RESERVACIÓN DE LABORATORIOS] Credenciales de Usuario",
    text:
      "Hola " + firstName + "," +
      "\n\n" +
      "Bienvenido al Sistema de Reservación de Laboratorios," +
      "\n" +
      "Utilice las siguientes credenciales para iniciar sesión en la aplicación: \nNombre de Usuario: " +
      userId +
      "\nContraseña: " +
      password +
      "\n" +
      "Se le recomienda cambiar la contraseña al ingresar al sitio." +
      "\n\n" +
      "\nCualquier consulta, envie un correo electrónico a la dirección: celabscr@gmail.com",
  };

  const databaseConnection = getConnection();
  databaseConnection
    .collection("users")
    .findOne(
      { userId: userId },
      { projection: { _id: 0 } },
      function (error, data) {
        if (error) {
          res
            .status(400)
            .send(
              "⛔️ An error occurred getting single users ... \n[Error]: " +
                error
            );
        } else {
          if (data === null) {
            databaseConnection
              .collection("users")
              .insertOne(user, (error, data) => {
                if (error) {
                  res
                    .status(400)
                    .send(
                      "⛔️ An error occurred creating users ... \n[Error]: " +
                        error
                    );
                } else {
                  res
                    .status(200)
                    .send("☑️ The user was created successfully ... ");
                  transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log("Mail sended: " + info.response);
                    }
                  });
                }
              });
          } else if (data !== null) {
            res
              .status(401)
              .send("⚠️ There is already a user with the given id ...");
          }
        }
      }
    );
};

// the following data can be changed: firstName, password, lastName, userType, email, phone
const updateUser = (req, res) => {
  let userId = req.params.userId;
  let modificationDate = { modificationDate: getFullDate() };
  var jsonBodyAndModificationDate = jsonConcat(req.body, modificationDate);
  const databaseConnection = getConnection();

  var newData = { $set: jsonBodyAndModificationDate };

  databaseConnection
    .collection("users")
    .updateOne({ userId: userId }, newData, function (error) {
      if (error) {
        res
          .status(400)
          .send("⛔️ An error occurred updating users ... \n[Error]: " + error);
      } else {
        res.status(200).send("☑️ The user was modified successfully ... ");
      }
    });
};

const setUserStatus = (req, res) => {
  let userId = req.params.userId;
  const databaseConnection = getConnection();

  var newData = { $set: req.body };

  databaseConnection
    .collection("users")
    .updateOne({ userId: userId }, newData, function (error) {
      if (error) {
        res
          .status(400)
          .send("⛔️ An error occurred updating users ... \n[Error]: " + error);
      } else {
        res
          .status(200)
          .send("☑️ The user status was modified successfully ... ");
      }
    });
};

const removeUser = (req, res) => {
  let userId = req.params.userId;

  const databaseConnection = getConnection();
  databaseConnection
    .collection("users")
    .deleteMany({ userId: userId }, function (error) {
      if (error) {
        res
          .status(400)
          .send("⛔️ An error occurred deleting users ... \n[Error]: " + error);
      } else {
        res.status(200).send("☑️ The user was deleted successfully ... ");
      }
    });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  getReservationsNumber,
  searchUsers,
  createUser,
  updateUser,
  setUserStatus,
  removeUser,
};
