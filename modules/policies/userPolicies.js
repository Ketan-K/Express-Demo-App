let isValidUser = (req, res, next) => {
  //if req.body.user is not valid return invalid user request
  //else next() 

  return next()
}


let isAdmin = (req, res, next) => {
  //if isValidUser && user.role == admin
  return next();
}

module.exports = {
  isValidUser: isValidUser,
  isAdmin: isAdmin
} 
