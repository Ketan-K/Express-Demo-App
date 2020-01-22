const sequelize = require("sequelize"),
    sequelize_mysql = require("../helpers/sequelize-mysql"),
    Orders = require("./orderModel"),
    Items = require("./itemModule");

OrderItem = sequelize_mysql.define("OrderItem", {
    price: {
        type: sequelize.DECIMAL,
        allowNull: false
    },
    quantity: {
        type: sequelize.INTEGER,
        defaultValue: 1
    }
});

Orders.belongsToMany(Items, { through: OrderItem, foreignKey: 'orderId' });
Items.belongsToMany(Orders, { through: OrderItem, foreignKey: 'itemCode' });

module.exports = OrderItem
