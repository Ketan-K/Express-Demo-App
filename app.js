"use strict";
const express = require("express");
const config = require("./config/config");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hey ! This is demo application");
});

console.log("Setting up routes.");
require("./routes")(app);

const port = Number(process.env.PORT || config.server.port);

const server = app.listen(port, () =>
  console.log(`Listening on ${server.address().port}`)
);

module.exports = app;
