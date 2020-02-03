const itemModule = require("../models/itemModule"),
    itemHelper = require("../helpers/itemHelper")

let addItem = (item) => {
    return new Promise(function (resolve, reject) {
        if (!item.name || !item.price || !item.categoryCode)
            return reject({ status: -1, message: "Request Data Missing" });
        itemHelper.generateNewItemCode().then(
            code => {
                item.code = code;
                if (item.image) {
                    let path = '/images/' + item.code + ".jpeg";
                    itemHelper.saveBase64Image(item.image, "./public" + path).catch(err => {
                        item.image = "";
                    })
                    item.image = path;
                }
                itemModule.create(item)
                    .then(data => {
                        return resolve({ status: 0, data: data })
                    })
                    .catch(err => {
                        if (err.errors)
                            return reject({ status: -1, message: err.errors[0].message })
                        return reject({ status: -1, message: err.message })
                    })
            })
            .catch((err) => {
                console.log(err)
                return reject({ status: -1, message: "Error in New Code Generation" })
            })

    })
}

let listItem = () => {
    return new Promise(function (resolve, reject) {
        itemModule.findAll()
            .then(items => {
                return resolve({ status: 0, list: items })
            })
            .catch(err => {
                console.log("Listitem Error :: " + err)
                return reject({ status: -1, message: err.message })
            })
    })
}

let updateItemName = (updateValues) => {
    return new Promise(function (resolve, reject) {
        if (!updateValues.name || !updateValues.code) {
            return reject({ status: -1, message: "Request Data Missing" })
        }
        itemModule.update({ name: updateValues.name }, { where: { code: updateValues.code } })
            .then(data => {
                if (data == 1)
                    return resolve({ status: 0, message: "Item name Updated" })
                else
                    return reject({ status: -1, message: "Item not Found" })

            })
            .catch(err => {
                console.log("Error : " + err)
                return reject({ status: -1, message: "Error Updating Item" })
            })
    })
}

let deleteItem = (item) => {
    return new Promise(function (resolve, reject) {
        if (!item.code) {
            return reject({ status: -1, message: "Request Data Missing" })
        }
        itemModule.destroy({ where: { code: item.code } })
            .then(data => {
                if (data == 1)
                    return resolve({ status: 0, message: "Item Deleted" })
                else
                    return reject({ status: -1, message: "Item not Found" })

            })
            .catch(err => {
                console.log("Error : " + err)
                return reject({ status: -1, message: "Error Deleting item" })
            })
    })
}

module.exports = {
    addItem: addItem,
    listItem: listItem,
    updateItemName: updateItemName,
    deleteItem: deleteItem
}