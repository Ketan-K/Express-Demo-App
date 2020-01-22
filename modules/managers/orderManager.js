const Orders = require("../models/orderModel"),
    Items = require("../models/itemModule"),
    OrderItem = require("../models/orderItem"),
    User = require("../models/userModel"),
    OrderHelper = require("../helpers/orderHelper")

let placeOrder = (orderDetails, uid) => {
    return new Promise((resolve, reject) => {
        if (!orderDetails.items
            || !orderDetails.orderDate
            || !orderDetails.clientOrderId
            || !orderDetails.subTotal
            || !orderDetails.total
            || !orderDetails.paymentMode
        ) {
            return reject({ status: -1, message: "Request Data Missing" });
        }
        OrderHelper.generateNewOrderId().then(orderId => {
            orderDetails.orderId = orderId;
        }).then(() => {
            Orders.create(orderDetails).then(order => {
                let fLen = orderDetails.items.length;
                orderDetails.items.forEach(reqitem => {
                    Items.findByPk(reqitem.code).then(item => {
                        try {
                            let orderItem = {
                                orderId: order.orderId,
                                itemCode: item.code,
                                quantity: reqitem.quantity,
                                price: item.price
                            }
                            OrderItem.create(orderItem).then((result => {
                                fLen--;
                                if (fLen == 0) {
                                    User.findByPk(uid).then(user => {
                                        user.addOrder(order).then(() => {
                                            return resolve({ status: 0, message: "Order Placed" });
                                        });
                                    });
                                }
                            })).catch(err => {
                                return reject({ status: -1, message: "Error in OrderItem : " + err.message });
                            })
                        } catch (err) {
                            return reject({ status: -1, message: err.message });
                        }
                    })
                })
            }).catch((err) => {
                if (err.errors) {
                    return reject({ status: -1, message1: err.errors[0].message });
                }
                return reject({ status: -1, message2: err.message });
            })
        })
    })

}

module.exports = {
    placeOrder: placeOrder
};