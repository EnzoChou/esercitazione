var Promise = require('bluebird');
var addLineItem = require('../api/lineItemsToAdd');
var inviaMessaggio = require('./creazioneMessaggioDiRitorno');

var addToCart = function (idVino, idCheckout, quantity) {
    var lineItemsToAdd = [{
        variantId: idVino,
        quantity: quantity,
    }];
    return new Promise((resolve, reject) => {
        return addLineItem(idCheckout, lineItemsToAdd)
        .then(checkout => {
            console.log('carrello aggiornato', checkout);
            var messaggi = ['vino inserito', 'posso fare altro per te?'];
            return inviaMessaggio(messaggi);
        })
        .then(messaggioDiRitorno => {
            resolve(messaggioDiRitorno);
            return messaggioDiRitorno;
        })
        .catch(err => {
            console.log('c\'è stato un errore nell\'addToCart', err);
            reject(err);
        })
    })
};

module.exports = addToCart;