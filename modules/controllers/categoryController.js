
const categoryManager = require("../managers/categoryManager");

let addCategory = (req, res) => {
    console.log("Add new category")
    return categoryManager.addCategory(req.body)
        .then(data => {
            return res.json(data)
        })
        .catch(err => {
            return res.json(err)
        })
}


let listCategory = (req, res) => {
    console.log("List Category");
    return categoryManager.listCategory()
        .then(data => {
            return res.json(data)
        })
        .catch(err => {
            return res.json(err)
        })
}

let updateCategory = (req, res) => {
    console.log("Update Category");
    return categoryManager.updateCategory(req.body)
        .then(data => {
            return res.json(data)
        })
        .catch(err => {
            return res.json(err)
        })
}

let deleteCategory = (req, res) => {
    console.log("Delete Category");
    return categoryManager.deleteCategory(req.body)
        .then(data => {
            return res.json(data)
        })
        .catch(err => {
            return res.json(err)
        })
}


module.exports = {
    addCategory: addCategory,
    listCategory: listCategory,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory
};
