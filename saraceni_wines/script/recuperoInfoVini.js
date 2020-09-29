const {
    resolve
} = require('bluebird');
var fetchAll = require('../api/fetchAll');
var fs = require('fs');
var outputFile = '../json/ricette.json';
var data = null;

var toJsonFile = function (result) {
    var json = JSON.stringify(result, null, 4);
    fs.writeFile(outputFile, json, function (err) {
        if (err) throw err;
        console.log('Results saved in', outputFile);
    });
}

var recuperoIdVini = function (data) {
    return new Promise(function (resolve, reject) {
            fetchAll()
                .then(result => {
                    result.forEach(element => {
                        console.log('prezzo dell\'elemento ---> ', element.variants[0].price);
                        var index = data.listaVini.map(el => el.nome).indexOf(element.title);
                        console.log('indice vino con questo nome', element.title, ': ---> ', index);
                        if (~index) {
                            console.log('indice vino da modificare', index);
                            data.listaVini[index].id = element.id;
                            data.listaVini[index].prezzo = element.variants[0].price;
                        }
                    });
                    console.log('lista vini con id modificata', data.listaVini);
                    resolve(data);
                })
                .catch(error => {
                    console.log('error del fetch all ---> ', error);
                    reject();
                });
        })
        .then(data => {
            toJsonFile(data);
            resolve(data);
        })
        .catch(error => {
            console.log('error prima promise ---> ', error);
            reject();
        })
};

var modificaIdVini = function () {
    if (!data) {
        data = require('../json/ricette');
    }
    recuperoIdVini(data);
}

// modificaIdVini();

module.exports = recuperoIdVini;