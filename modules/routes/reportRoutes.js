const UserPolicies = require("../policies/userPolicies"),
    ReportController = require("../controllers/reportController"),
    express = require("express"),
    router = express.Router();

router.get("/order_report", UserPolicies.isAdmin, ReportController.orderReport);
router.get("/order_detail_report", UserPolicies.isAdmin, ReportController.orderDetailReport);


module.exports = router;