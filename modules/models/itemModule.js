const sequelize = require("sequelize"),
    sequelize_mysql = require("../helpers/sequelize-mysql"),
    Category = require("./categoryModule")
Item = sequelize_mysql.define("item", {
    code: {
        type: sequelize.STRING,
        primaryKey: true,
        validate: {
            len: { args: [10, 10], msg: "Code must be of length 10" }
        }
    },
    name: {
        type: sequelize.STRING,
        unique: true,
        allowNull: false
    },
    price: {
        type: sequelize.DECIMAL,
        allowNull: false
    },
    image: {
        type: sequelize.STRING
        //  allowNull: false
    },
    description: {
        type: sequelize.TEXT
    }
})

Category.hasMany(Item);
Item.belongsTo(Category)

module.exports = Item;