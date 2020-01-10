let isValidUser = (req, res, next) => {
  //if req.body.user is not valid return invalid user request
  //else next();

  return next();
};

module.exports = { isValidUser: isValidUser };
