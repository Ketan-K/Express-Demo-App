const categoryModule = require("../models/categoryModule"),
    categoryHelper = require("../helpers/categoryHelper")
let addCategory = (category) => {
    return new Promise(function (resolve, reject) {
        if (!category.name)
            return reject({ status: -1, message: "Request Data Missing" });
        categoryHelper.generateNewCategoryCode().then(
            code => {
                category.code = code;
                console.log(code)
                categoryModule.create(category)
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

let listCategory = async () => {
    return new Promise(function (resolve, reject) {
        categoryModule.findAll()
            .then(categories => {
                return resolve({ status: 0, list: categories })
            })
            .catch(err => {
                console.log("ListCategory Error :: " + err)
                return reject({ status: -1, message: err.message })
            })
    })
}

let updateCategory = (updateValues) => {
    return new Promise(function (resolve, reject) {
        if (!updateValues.name || !updateValues.code) {
            return reject({ status: -1, message: "Request Data Missing" })
        }
        categoryModule.update({ name: updateValues.name }, { where: { code: updateValues.code } })
            .then(data => {
                if (data == 1)
                    return resolve({ status: 0, message: "Category Updated" })
                else
                    return reject({ status: -1, message: "Category not Found" })

            })
            .catch(err => {
                console.log("Error : " + err)
                return reject({ status: -1, message: "Error Updating Category" })
            })
    })
}

let deleteCategory = (category) => {
    return new Promise(function (resolve, reject) {
        if (!category.code) {
            return reject({ status: -1, message: "Request Data Missing" })
        }
        categoryModule.destroy({ where: { code: category.code } })
            .then(data => {
                if (data == 1)
                    return resolve({ status: 0, message: "Category Deleted" })
                else
                    return reject({ status: -1, message: "Category not Found" })

            })
            .catch(err => {
                console.log("Error : " + err)
                return reject({ status: -1, message: "Error Deleting Category" })
            })
    })
}

module.exports = {
    addCategory: addCategory,
    listCategory: listCategory,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory
}