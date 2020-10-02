var Promise = require('bluebird');
var shopifyApi = require('../api/shopifyApi');

var controlloNumeroVini = function (checkoutId) {
    return new Promise((resolve, reject) => {
        return shopifyApi.checkoutFetch(checkoutId)
            .then(checkout => {
                var cont = 0;
                if (checkout.lineItems.length > 0) {
                    checkout.lineItems.forEach(lineItem => {
                        cont += lineItem.quantity;
                    })
                }
                resolve(cont);
            })
            .catch(err => {
                console.log('errore nel controllo numero vini', err);
                reject(err);
            })
    })
}

module.exports = controlloNumeroVini;