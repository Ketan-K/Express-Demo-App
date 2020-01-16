"use strict"
const sequelize = require("sequelize")
const bcrypt = require("bcrypt")
const AuthToken = require("./authToken")
const sequelize_mysql = require("../helpers/sequelize-mysql")
const User = sequelize_mysql.define("user", {
  username: {
    type: sequelize.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: sequelize.STRING,
    allowNull: false
  },
  role: {
    type: sequelize.STRING,
    allowNull: false,
    defaultValue: "customer"
  }
}, {
  hooks: {
    beforeCreate: function (user) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
    }
  }
})

User.hasMany(AuthToken)
AuthToken.belongsTo(User)

User.prototype.authorize = async function () {
  const user = this
  const authToken = await AuthToken.generate(user)
  await user.addAuthToken(authToken)
  return authToken.token
}

User.authenticate = async function (username, password) {
  const user = await User.findOne({ where: { username: username } })
  if (!user)
    throw new Error('No user found')

  if (bcrypt.compareSync(password, user.password)) {
    return user.authorize()
  }
  throw new Error('invalid password')
}

User.logout = async function (token) {
  console.log("Destroy")
  return AuthToken.destroy({ where: { token } })
}

User.updatepassword = async function (username, newpassword) {
  newpassword = bcrypt.hashSync(newpassword, bcrypt.genSaltSync(10), null)
  return User.update({ password: newpassword }, { where: { username: username } }, { individualHooks: true })
}


module.exports = User 
