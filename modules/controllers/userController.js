const userManager = require("../managers/userManager")

//Get list of all users
let listUsers = function (req, res, next) {
  console.log("Controller :: listUser.")
  return userManager
    .listUsers()
    .then(data => {
      return res.json(data)
    })
    .catch(next)
}

//Register new user
let addUser = function (req, res, next) {
  console.log("Controller :: addUser.")
  return userManager
    .addUser(req.body)
    .then(data => {
      return res.json(data)
    })
    .catch(err => {
      return res.json(err)
    })
}


let login = function (req, res, next) {
  console.log("Controller :: login.")
  return userManager
    .login(req.body)
    .then(data => {
      return res.json(data)
    })
    .catch(err => {
      return res.json(err)
    })
}


let logout = function (req, res, next) {
  console.log("Controller :: logout.")
  return userManager
    .logout(req.header('authToken'))
    .then(data => {
      return res.json(data)
    })
    .catch(err => {
      return res.json(err)
    })
}

let updatepassword = function (req, res, next) {
  console.log("Controller :: logout.")
  return userManager
    .updatepassword(req.body)
    .then(data => {
      return res.json(data)
    })
    .catch(err => {
      return res.json(err)
    })
}



module.exports = {
  listUsers: listUsers,
  addUser: addUser,
  login: login,
  logout: logout,
  updatepassword: updatepassword
} 
