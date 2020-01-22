const OrderManager = require("../managers/orderManager");
//OrderModel = require("../models/orderModel");

let placeOrder = async (req, res) => {
    let uid = await req.header('uid')
    OrderManager.placeOrder(req.body, uid).then(data =>
        res.send(data)
    ).catch(err => res.send(err))
}

module.exports = {
    placeOrder: placeOrder
}