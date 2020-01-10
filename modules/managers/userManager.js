const User = require("../models/userModel")

let listUsers = () => {
  return new Promise(function (resolve, reject) {
    User.findAll()
      .then(users => {
        if (users.length == 0)
          return resolve({ status: 0, message: "No User Found" })
        return resolve({ status: 1, list: users })
      })
      .catch(err => {
        console.log("ListUser Error :: " + err)
        return reject({ status: 404, message: err.message })
      })
  })
}

let addUser = user => {
  /*
    if (!user.username || !user.password || !user.email)
      throw new BadRequestError('Request Data missing') 
  */
  return new Promise(function (resolve, reject) {

    if (!user.username || !user.password || !user.email)
      return reject({ status: -1, message: 'Request Data missing' })

    User.create(user)
      .then(data => {
        return resolve({ status: 0, data: data })
      })
      .catch(err => {
        return reject({ status: -1, message: err.errors[0].message })
      })
  })
}

let login = user => {

  return new Promise(function (resolve, reject) {

    if (!user.username || !user.password)
      return reject({ status: -1, message: 'Request Data missing' })

    User.authenticate(user.username, user.password).then((authToken) => {
      return resolve({ status: 0, authToken: authToken, message: "Success" })
    }).catch((err) => {
      console.log(err)
      return reject({ status: -1, message: err.message })
    })
  })
}

let logout = authToken => {
  console.log("LOGOUT")
  return new Promise(function (resolve, reject) {
    if (!authToken) {
      console.log('Request Data missing')
      return reject({ status: -1, message: 'Request Data missing' })
    }
    console.log("LOGOUT PROMISE")
    User.logout(authToken).then(() => {
      console.log("Logged out.")
      return resolve({ status: 0, message: "Logged out." })
    })
  })
}


let updatepassword = (user) => {
  console.log("UPDATEPASSWORD")
  return new Promise(function (resolve, reject) {
    if (!user.username || !user.newpassword) {
      console.log('Request Data missing')
      return reject({ status: -1, message: 'Request Data missing' })
    }
    User.updatepassword(user.username, user.newpassword).then(() => {
      console.log("Password Updated.")
      return resolve({ status: 0, message: "Password Updated" })
    }).catch(err => {
      return reject({ status: -1, message: err })
    })
  })
}

module.exports = {
  listUsers: listUsers,
  addUser: addUser,
  login: login,
  logout: logout,
  updatepassword: updatepassword
} 
