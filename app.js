"use strict"
const express = require("express")
const config = require("./config/config")
const app = express(),
  path = require("path")
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hey ! This is demo application")
})


app.use(function (req, res, next) {
  var filename = path.basename(req.url);
  var extension = path.extname(filename);
  if (extension === '.xlsx')
    console.log("The file " + filename + " was requested.");
  next();
},
  express.static('public'));

console.log("Setting up routes.")
require("./routes")(app)

const port = Number(process.env.PORT || config.server.port)

const server = app.listen(port, () =>
  console.log(`Listening on ${server.address().port}`)
)

module.exports = app 
