const AuthToken = require("../models/authToken"),
  User = require("../models/userModel");


let isValidUser = async (req, res, next) => {
  //if req.body.user is not valid return invalid user request
  //else next() 
  let authToken = await req.header('authToken')
  if (!authToken)
    return res.json({ status: -1, message: "Header Absent" })
  AuthToken.findOne({ where: { token: authToken } })
    .then(token => {
      if (token)
        token.getUser()
          .then(user => {
            if (user.username)
              return next()
            else
              return res.send({ status: -1, message: "User not found" })
          })
      else
        return res.send({ status: -1, message: "Invalid Token" })

    })

}


let isAdmin = async (req, res, next) => {
 let authToken = await req.header('authToken')
  if (!authToken)
    return res.json({ status: -1, message: "Header Absent" })
  AuthToken.findOne({ where: { token: authToken } })
    .then(token => {
      if (token)
        token.getUser()
          .then(user => {
            if (user.role == "admin")
              return next()
            else
              return res.send({ status: -1, message: "Unauthorized Request" })
          })
      else
        return res.json({ status: -1, message: "Invalid Token" })
    })
}

module.exports = {
  isValidUser: isValidUser,
  isAdmin: isAdmin
} 
