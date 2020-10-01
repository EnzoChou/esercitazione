var Promise = require('bluebird');
var checkoutFetch = require('../api/checkoutFetch');

var controlloNumeroVini = function (checkoutId) {
    return new Promise((resolve, reject) => {
        return checkoutFetch(checkoutId)
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