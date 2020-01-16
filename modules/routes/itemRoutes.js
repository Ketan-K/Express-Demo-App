const itemController = require("../controllers/itemController"),
    userPolicies = require("../policies/userPolicies"),
    express = require("express"),
    router = express.Router();


router.get("/list", itemController.listItem);
router.post("/add", userPolicies.isAdmin, itemController.addItem);
router.post("/update", userPolicies.isAdmin, itemController.updateItemName);
router.delete("/delete", userPolicies.isAdmin, itemController.deleteItem);

module.exports = router;