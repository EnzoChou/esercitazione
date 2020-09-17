const { promiseImpl } = require("ejs");

function processing(options) {
    return new Promise(function (resolve, reject) {
        return request(options)
            .then(response => {
                if (response) {
                    console.log("Status response.statusCode");
                    console.log("Body response.body");
                    if (response.statusCode == 200) {
                        console.log(response.body);
                        var data = JSON.parse(response.body);
                        resolve(data);
                    } else {
                        resolve();
                    }
                } else {
                    resolve();
                }
            })
            .catch(error => {
                console.log(err)
                reject();
            });
    });
};

exports.processing = processing;