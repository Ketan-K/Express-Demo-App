"use strict"
module.exports = app => {
  app.use("/user", require("./modules/routes/userRoutes"))

  app.use((req, res, next) => {
    if (res.headerSent) return next()
    res.status(400).json({ error: "This route not exist." })
  })
} 
