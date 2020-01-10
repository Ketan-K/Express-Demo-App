const express = require("express"),
  router = express.Router(),
  userController = require("../controllers/userController"),
  userPolicies = require("../policies/userPolicies")
router.get("/list", userPolicies.isValidUser, userController.listUsers)
router.post("/register", userController.addUser)
router.post("/login", userController.login)
router.delete("/logout", userPolicies.isValidUser, userController.logout)
router.post("/updatepassword", userPolicies.isValidUser, userController.updatepassword)

module.exports = router 
