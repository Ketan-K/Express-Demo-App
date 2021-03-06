const Orders = require("../models/orderModel"),
    Items = require("../models/itemModule"),
    ReportHelper = require("../helpers/reportHelper"),
    OrderItems = require("../models/orderItem"),
    sequelize = require("sequelize")
let orderReport = (reportReq, uid) => {
    return new Promise((resolve, reject) => {
        if (!reportReq.fromDate) {
            return reject({ status: -1, message: "Request Data Missing" });
        }
        reportReq.toDate = reportReq.toDate ? reportReq.toDate : new Date()
        var filename = "./public/reports/" + uid + "-ORDER-REPORT-" + new Date().getTime() + ".xlsx"
        Orders.findAll({
            attributes: {
                exclude: ['status', 'clientOrderId', 'createdAt', 'updatedAt']
            },
            where: {
                orderDate: {
                    [sequelize.Op.lte]: new Date(reportReq.toDate),
                    [sequelize.Op.gte]: new Date(reportReq.fromDate)
                }
            }

        })
            .then(result => {
                if (!result || result.length == 0) {
                    return reject({ status: -1, message: "No Orders Found" })
                }

                ReportHelper.makeExcelSheetForOrderReport(result, filename)
                    .then(() => {
                        return resolve({ status: 0, report: filename, orders: result })
                    }).catch(err => {
                        return reject({ status: -1, message: "Error in report generation" })
                    })
            })

    })
}

let orderDetailReport = (reportReq, uid) => {
    return new Promise((resolve, reject) => {
        // if (!reportReq.fromDate || !reportReq.toDate) {
        //     return reject({ status: -1, message: "Request Data Missing" });
        // }
        var filename = "/reports/" + uid + "-ORDER-DETAIL-REPORT-" + new Date().getTime() + ".xlsx";

        Orders.findAll({
            attributes: ['orderId', 'orderDate', 'username', 'paymentMode'],
            include: [{
                model: Items,
                attributes: ['code', 'name'],
                through: {
                    attributes: ['quantity', 'price']
                }
            }]
        })
            .then(result => {
                if (!result || result.length == 0) {
                    return reject({ status: -1, message: "No Orders Found" })
                }

                ReportHelper.makeExcelSheetForOrderDetailReport(result, "./public" + filename)
                    .then(() => {
                        return resolve({ status: 0, report: filename })
                    })
                    .catch(err => {
                        return reject({ status: -1, message: err + "Error in report generation" })
                    })
            })

    })
}

module.exports = {
    orderReport: orderReport,
    orderDetailReport: orderDetailReport
}