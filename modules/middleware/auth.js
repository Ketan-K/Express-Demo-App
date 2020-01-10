let auth = (req, res, next) => {
  if (req.cookies.username) next()
  else res.send({ status: false, message: "Not Logged in" })
}

module.exports = auth 
