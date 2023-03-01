/*
=================================================================================
* Sistema de Reservación de Laboratorios CE - v1.0.0
=================================================================================
* Copyright 2022 ce-labs (https://github.com/ce-labs)
=================================================================================
* The above copyright notice and this permission notice shall 
  be included in all copies or substantial portions of the Software.
*/

const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use("/api/v1/auth", require("./routes/api/auth.routes"));
app.use("/api/v1/blockades", require("./routes/api/blockades.routes"));
app.use("/api/v1/reservations", require("./routes/api/reservations.routes"));
app.use("/api/v1/data", require("./routes/api/data.routes"));
app.use("/api/v1/users", require("./routes/api/users.routes"));
app.use("/api/v1/utils", require("./routes/api/utils.routes"));

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "Sistema de Reservación de Laboratorios CE 📅 \nStatus: Welcome to ce-labs\nEmail: celabscr@gmail.com"
    );
});
app.get("*", (req, res) => {
  res
    .status(405)
    .send(
      "Sistema de Reservación de Laboratorios CE 📅 \nError: Method does not exist"
    );
});
app.post("*", (req, res) => {
  res
    .status(405)
    .send(
      "Sistema de Reservación de Laboratorios CE 📅 \nError: Method does not exist"
    );
});
app.put("*", (req, res) => {
  res
    .status(405)
    .send(
      "Sistema de Reservación de Laboratorios CE 📅 \nError: Method does not exist"
    );
});
app.delete("*", (req, res) => {
  res
    .status(405)
    .send(
      "Sistema de Reservación de Laboratorios CE 📅 \nError: Method does not exist"
    );
});

app.listen(PORT, () => console.log(`Server running 🚀 on port: ${PORT}...`));
