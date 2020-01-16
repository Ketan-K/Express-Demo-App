const sequelize_mysql = require("../helpers/sequelize-mysql")
const sequelize = require("sequelize")
const User = require("./userModel")
const bcrypt = require("bcrypt")

const AuthToken = sequelize_mysql.define("AuthToken", {
    token: {
        type: sequelize.STRING,
        unique: true,
        allowNull: false
    }
})

//AuthToken.belongsTo(User) 

AuthToken.generate = async function (User) {
    if (!User) {
        throw new Error('AuthToken requires a valid user')
    }
    let token = bcrypt.hashSync(User.username, bcrypt.genSaltSync(10), null)
    return AuthToken.create({ token })
}

module.exports = AuthToken 
