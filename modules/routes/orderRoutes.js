const express = require("express"),
    router = express.Router(),
    UserPolicies = require("../policies/userPolicies"),
    OrderController = require("../controllers/orderController");

router.use("/place", UserPolicies.isValidUser, OrderController.placeOrder);


module.exports = router