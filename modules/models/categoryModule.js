const sequelize = require("sequelize")
const sequelize_mysql = require("../helpers/sequelize-mysql")
const Category = sequelize_mysql.define("category", {
    code: {
        type: sequelize.STRING,
        primaryKey: true,
        validate: {
            len: { args: [10, 10], msg: "Code must be of length 10" }
        }
    },
    name: {
        type: sequelize.STRING,
        unique: true,
        allowNull: false
    }
})
module.exports = Category