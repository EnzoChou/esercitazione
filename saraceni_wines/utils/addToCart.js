var Promise = require('bluebird');
var addLineItem = require('../api/lineItemsToAdd');
var shopifyApi = require('../api/shopifyApi');
var inviaMessaggio = require('./creazioneMessaggioDiRitorno');

var addToCart = function (user, event, variantsIdVIno, idCheckout, quantity) {
    var lineItemsToAdd = [{
        variantId: variantsIdVIno,
        quantity: quantity
    }];
    return new Promise((resolve, reject) => {
        return shopifyApi.fetchById(variantsIdVIno)
            .then(vino => {
                if (vino) {
                    return addLineItem(idCheckout, lineItemsToAdd)
                        .then((checkout) => {
                            var messaggi = ["Wine added", "What else can I do for you?"];
                            console.log('carrello aggiornato', checkout);
                            return inviaMessaggio(messaggi);
                        })
                } else {
                    var messaggi = ["Sorry, I haven't found that specific wine", "Can I help you any other way?"];
                    return inviaMessaggio(messaggi);
                }
            })
            .then((messaggioDiRitorno) => {
                resolve(messaggioDiRitorno);
                return messaggioDiRitorno;
            })
            .catch((err) => {
                console.log('c\'è stato un errore nell\'addToCart', err);
                reject(err);
            });
    })
};

module.exports.processing = addToCart;
