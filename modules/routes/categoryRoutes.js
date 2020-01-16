const express = require("express"),
    router = express.Router(),
    categoryController = require("../controllers/categoryController"),
    userPolicies = require("../policies/userPolicies")


router.get("/list", categoryController.listCategory)
router.post("/add", userPolicies.isAdmin, categoryController.addCategory)
router.post("/update", userPolicies.isAdmin, categoryController.updateCategory)
router.delete("/delete", userPolicies.isAdmin, categoryController.deleteCategory)

module.exports = router 
