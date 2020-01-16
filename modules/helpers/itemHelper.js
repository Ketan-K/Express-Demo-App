const ItemModule = require("../models/itemModule"),
    fs = require('fs')
let generateNewItemCode = () => {
    return new Promise(function (resolve, reject) {
        ItemModule.max('code').then(lastcode => {
            if (lastcode == 0) {
                return resolve("ITM-000001")
            }
            let str = lastcode.split("-");
            var s = Number(str[1]) + 1 + "";
            while (s.length < 6) s = "0" + s;
            return resolve(str[0] + '-' + s);
        })
            .catch(err => { reject(err); })
    })
}

let saveBase64Image = (dataString, path) => {
    return new Promise(function (resolve, reject) {
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (matches.length !== 3) {
            return reject(new Error('Invalid input string'));
        }
        let base64Image = dataString.split(';base64,').pop();
        fs.writeFileSync(path, base64Image, { encoding: 'base64' }, function (err) {
            return resolve("File Created")
        });
    })
}

module.exports = {
    generateNewItemCode: generateNewItemCode,
    saveBase64Image: saveBase64Image
};