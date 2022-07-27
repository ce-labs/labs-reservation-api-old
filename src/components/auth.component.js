const jwt = require("jsonwebtoken");
const { getConnection } = require("../shared/connection");
const { isCorrect } = require("../shared/auth/auth.functions");
const {
  generateRecoveryCode,
  getFullDate,
  jsonConcat,
} = require("../shared/utils/utils");
const { transporter } = require("../shared/mailer");

const secret = "mysecretsshhh";

const verifyUser = (req, res) => {
  console.log(req.body);
  const { userId, password } = req.body;

  const databaseConnection = getConnection();
  databaseConnection.collection("users").findOne({ userId }, (error, user) => {
    if (error) {
      res
        .status(400)
        .send(
          "⛔️ An error occurred verifying the user ... \n[Error]: " + error
        );
    } else if (!user) {
      res
        .status(401)
        .send(
          "⚠️ There are no users with the given specifications ... \n[Error]: Incorrect userId"
        );
    } else {
      let response = isCorrect(password, user.password);
      if (!response) {
        res
          .status(401)
          .send(
            "⚠️ There are no users with the given specifications ... \n[Error]: Incorrect userId or password"
          );
      } else {
        const payload = { userId };
        const token = jwt.sign(payload, secret, {
          expiresIn: "1h",
        });
        res.cookie("token", token, { httpOnly: true }).sendStatus(200);
      }
    }
  });
};

const getRecoveryCode = (req, res) => {
  const { userId, mail } = req.body;

  const databaseConnection = getConnection();
  databaseConnection.collection("users").findOne({ userId }, (error, user) => {
    if (error) {
      res
        .status(400)
        .send(
          "⛔️ An error occurred verifying the user ... \n[Error]: " + error
        );
    } else if (!user) {
      res.status(401).send("⚠️ Incorrect userId");
    } else {
      let response = isCorrect(mail, user.mail);
      if (!response) {
        res.status(401).send("⚠️ Incorrect mail");
      } else {
        let code = generateRecoveryCode();

        var mailOptions = {
          from: "laboratorioscefk@gmail.com",
          to: mail,
          subject:
            "[SISTEMA DE RESERVACIÓN DE LABORATORIOS] Código de Recuperación de 4 Dígitos",
          text:
            "Utilice el siguiente código de recuperación para cambiar su contraseña: \nCódigo: " +
            code +
            "\nCualquier consulta, envie un correo electrónico a la dirección: laboratorioscefk@gmail.com",
        };

        let recoveryCode = { recoveryCode: code };
        var newData = { $set: recoveryCode };

        databaseConnection
          .collection("users")
          .updateOne({ userId }, newData, function (error) {
            if (error) {
              res
                .status(400)
                .send(
                  "⛔️ An error occurred updating the recovery code ... \n[Error]: " +
                    error
                );
            } else {
              res
                .status(200)
                .send("☑️ The recovery code was modified successfully ... ");
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Mail sended: " + info.response);
                }
              });
            }
          });
      }
    }
  });
};

const verifyRecoveryCode = (req, res) => {
  const { userId, recoveryCode } = req.body;

  const databaseConnection = getConnection();
  databaseConnection.collection("users").findOne({ userId }, (error, user) => {
    if (error) {
      res
        .status(400)
        .send(
          "⛔️ An error occurred verifying the user ... \n[Error]: " + error
        );
    } else if (!user) {
      res.status(401).send("⚠️ Incorrect userId or code");
    } else {
      let response = isCorrect(recoveryCode, user.recoveryCode);
      if (!response) {
        res.status(401).send("⚠️ Incorrect code");
      } else {
        res.status(200).send("☑️ The code provided is correct ... ");
      }
    }
  });
};

const updatePassword = (req, res) => {
  const { userId, password } = req.body;

  let newPassword = { password: password };
  let modificationDate = { modificationDate: getFullDate() };
  var jsonBodyAndModificationDate = jsonConcat(newPassword, modificationDate);
  var newData = { $set: jsonBodyAndModificationDate };

  const databaseConnection = getConnection();
  databaseConnection
    .collection("users")
    .updateOne({ userId }, newData, function (error) {
      if (error) {
        res
          .status(400)
          .send(
            "⛔️ An error occurred updating the user ... \n[Error]: " + error
          );
      } else {
        res.status(200).send("☑️ The user was modified successfully ... ");
      }
    });
};

module.exports = {
  verifyUser,
  getRecoveryCode,
  verifyRecoveryCode,
  updatePassword,
};
