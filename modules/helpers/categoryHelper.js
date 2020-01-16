const CategoryModule = require("../models/categoryModule")
let generateNewCategoryCode = () => {
    return new Promise(function (resolve, reject) {
        CategoryModule.max('code').then(lastcode => {
            if (lastcode == 0) {
                return resolve("CAT-000001")
            }
            let str = lastcode.split("-");
            var s = Number(str[1]) + 1 + "";
            while (s.length < 6) s = "0" + s;
            return resolve(str[0] + '-' + s);
        })
            .catch(err => { reject(err); })
    })
}

module.exports = { generateNewCategoryCode: generateNewCategoryCode };