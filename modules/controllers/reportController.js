const ReportManager = require("../managers/reportManager");

let orderReport = async (req, res) => {
    // console.log("Heyy..! Here reports will be generated");

    let uid = await req.header('uid')
    ReportManager.orderReport(req.body, uid)
        .then((data) => res.send(data))
        .catch(err => res.send(err))

}

let orderDetailReport = (req, res) => {
    ReportManager.orderDetailReport(req.body)
        .then((data) => res.send(data))
        .catch(err => res.send(err))

}

module.exports = {
    orderReport: orderReport,
    orderDetailReport: orderDetailReport
}