"use strict"

var Sequelize = require("sequelize"),
  mysql_config = require("../../config/config").mysql

let options = {
  port: mysql_config.port,
  host: mysql_config.host,
  dialect: "mysql",
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
    timezone: "+05:30"
  },
  timezone: "+05:30",
}

let sequelize_mysql = new Sequelize(
  mysql_config.database_name,
  mysql_config.user_name,
  mysql_config.password,
  options
)

sequelize_mysql
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.")
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err)
  })/*
sequelize_mysql
  .sync()
  .then(() =>
    console.log("Tables has been successfully created, if doesn't exist")
  )
  .catch(error => console.log("This error occured", error))
*/
sequelize_mysql.Promise = global.Promise

module.exports = sequelize_mysql 
