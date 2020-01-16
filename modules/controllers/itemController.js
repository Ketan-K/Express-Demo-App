
const itemManager = require("../managers/itemManager");

let addItem = (req, res) => {
    console.log("Add new Item")
    return itemManager.addItem(req.body)
        .then(data => {
            return res.json(data)
        })
        .catch(err => {
            return res.json(err)
        })
}


let listItem = (req, res) => {
    console.log("List Item");
    return itemManager.listItem()
        .then(data => {
            return res.json(data)
        })
        .catch(err => {
            return res.json(err)
        })
}

let updateItemName = (req, res) => {
    console.log("Update Item");
    return itemManager.updateItemName(req.body)
        .then(data => {
            return res.json(data)
        })
        .catch(err => {
            return res.json(err)
        })
}

let deleteItem = (req, res) => {
    console.log("Delete Item");
    return itemManager.deleteItem(req.body)
        .then(data => {
            return res.json(data)
        })
        .catch(err => {
            return res.json(err)
        })
}


module.exports = {
    addItem: addItem,
    listItem: listItem,
    updateItemName: updateItemName,
    deleteItem: deleteItem
};
