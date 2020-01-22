const OrderModule = require("../models/orderModel")
let generateNewOrderId = () => {
    return new Promise(function (resolve, reject) {
        OrderModule.max('orderId').then(lastId => {
            if (lastId == 0) {
                return resolve("ORDR-000001")
            }
            let str = lastId.split("-");
            var s = Number(str[1]) + 1 + "";
            while (s.length < 6) s = "0" + s;
            return resolve(str[0] + '-' + s);
        })
            .catch(err => { reject(err); })
    })
}

module.exports = { generateNewOrderId: generateNewOrderId };