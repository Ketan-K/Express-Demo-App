const sequelize_mysql = require("../helpers/sequelize-mysql"),
  sequelize = require("sequelize"),
  User = require("./userModel");

let Order = sequelize_mysql.define("order", {
  orderId: {
    type: sequelize.STRING,
    primaryKey: true
  },
  clientOrderId: {
    type: sequelize.STRING,
    allowNull: false,
    unique: true
  },
  subTotal: {
    type: sequelize.DECIMAL,
    allowNull: false,
    min: 0
  }
  ,
  total: {
    type: sequelize.DECIMAL,
    allowNull: false,
    min: 0
  },
  paymentMode: {
    type: sequelize.STRING,
    allowNull: false
  },
  status: {
    type: sequelize.STRING,
    allowNull: false,
    defaultValue: "Complete"
  },
  orderDate: {
    type: sequelize.DATE
  }
});

Order.belongsTo(User, {
  foreignKey: {
    name: 'username',
    allowNull: false
  }
});
User.hasMany(Order, {
  foreignKey: {
    name: 'username',
    allowNull: false
  }
});

module.exports = Order;