//const { promiseImpl } = require("ejs");
/*var http = require('http');

var processing = (url) => {
  return new Promise((resolve, reject) => {
    const request = http.request(url, res => {
      let chunks = [];
      res.on('data', chunk => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        let body = Buffer.concat(chunks).toString();
        resolve(body);
      })

    });
//handling error
    request.on('error', (e) => {
      reject('problem with request: ' + e.message);
    });
//here you have to put request.end()
    request.end();
  })
};
*/

function processing(options) {
    return new Promise(function (resolve, reject) {
        return request(options)
            .then(response => {
              console.log("response", response);
              console.log("response.statusCode", response.statusCode);
              console.log("response.body", response.body);
                if (response) {
                  console.log("c'è stata una risposta");
                  if( response.statusCode == 200){
                    var data = JSON.parse(response.body);
                    if (data.status == 'success') {
                        resolve(data.data);
                    } else {
                        resolve();
                    }
                } else {
                  console.log('statusCode non è risultato 200, l\'api di dummy è un pò sempliciotto');
                    var data = JSON.parse(response);
                    resolve(data);
                }}else{
                  console.log("non c'è alcuna response");
                  resolve();
                }
            })
            .catch(error => {
                console.log("generic_request error", error);
                reject();
            });
    });
};

exports.processing = processing;
