var Promise = require('bluebird');
var natural = require('natural');
var shopifyApi = require('../api/shopifyApi');
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
        shopifyApi.fetchAll()
            .then(result => {
                result.forEach(element => {
                    console.log('\n\nprezzo dell\'elemento ---> ', element.variants[0].price);
                    var cond = false;
                    for (let i = 0; i < data.listaVini.length && !cond; i++) {
                        console.log('controllo somiglianza tra',
                            element.title,
                            'e',
                            data.listaVini[i].nome,
                            '---> ',
                            natural.JaroWinklerDistance(element.title, data.listaVini[i].nome, undefined, true));
                        if (natural.JaroWinklerDistance(element.title, data.listaVini[i].nome, undefined, true) > 0.8) {
                            cond = true;
                            data.listaVini[i].id = element.id;
                            data.listaVini[i].variantsId = element.variants[0].id;
                            console.log('match vino ' + data.listaVini[i].nome + ' e modificato --> ', data.listaVini[i]);
                        }
                    }; if (!cond) {
                        var vinoTmp = {};
                        vinoTmp.id = element.id;
                        vinoTmp.nome = element.title;
                        vinoTmp.ricette = [];
                        vinoTmp.variantId = element.variants[0].id;
                        vinoTmp.prezzo = element.variants[0].price;
                        vinoTmp.immagine = element.variants[0].image.src;
                        console.log('vino non matchato, lo aggiungo ---> ', vinoTmp);
                        data.listaVini.push(vinoTmp);
                    }
                });
                console.log('lista vini con id modificata', data.listaVini);
                return (data);
            })
            .then(data => {
                toJsonFile(data);
                resolve(data);
            })
            .catch(error => {
                console.log('error del fetch all ---> ', error);
                reject();
            });
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

modificaIdVini();

module.exports = recuperoIdVini;