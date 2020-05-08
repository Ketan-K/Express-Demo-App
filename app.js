"use strict"
const express = require("express")
const config = require("./config/config")
const app = express(),
  path = require("path"),
  cors = require('cors')


app.use(express.json())
app.use(cors())
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,API-KEY");
    next();
});
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
