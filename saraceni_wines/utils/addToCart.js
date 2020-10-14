var Promise = require('bluebird');
var shopifyApi = require('../api/shopifyApi');
var inviaMessaggio = require('./creazioneMessaggioDiRitorno');

var calcoloQuantityVino = function (vinoShopify) {
    var quantity = 1;
    try {
        var tipoVino = vinoShopify.productType;
        tipoVino = tipoVino.split(',').map(caretteristica => caretteristica.trim());
        tipoVino = tipoVino[1];
        // console.log('sto lavorando su "' + tipoVino + '"');
        var cond = tipoVino.includes('x');
        if (cond) {
            quantity = tipoVino.slice(0, tipoVino.indexOf('x'));
            // console.log('quantity prima del parse', quantity);
            quantity = parseInt(quantity, 10);
            // console.log('quantity dopo il parse', quantity);
        }
    } catch (error) {
        console.log('errore di "' + product.title + '" sulla quantità ---> ', error);
        quantity = 1;
    } finally {
        return quantity;
    }
};

var aggiungiVino = function (vino = {}, quantity = 1) {
    var numeroVini = calcoloQuantityVino(vino).toString();
    console.log('numero vini', numeroVini);
    var lineItemsToAdd = [{
        variantId: vino.variants[0].id,
        quantity: quantity,
        customAttributes: [{ key: 'numeroVini', value: numeroVini }]
    }];
    console.log('lineItemsToAdd ritornato', lineItemsToAdd, '\n', lineItemsToAdd[0].customAttributes[0]);
    return lineItemsToAdd;
};

var controlloNumeroVini = function (checkout = {}) {
    var numeroViniAlCheckout = 0;
    if (checkout.lineItems.length > 0) {
        checkout.lineItems.forEach(element => {
            try {
                var numeroVini = element.customAttributes.find(elem => {
                    return elem.key == "numeroVini"
                }).value;
                numeroViniAlCheckout += element.quantity * numeroVini;
            } catch (error) {
                console.log('ha sminchiato il controlloNumeroVini dell\'elemento', element.title + ', ti rimando 1\n', error);
                numeroViniAlCheckout += element.quantity;
            }
        });
        return numeroViniAlCheckout;
    }
}

var addToCart = function (user, event, variantsIdVIno = 0, idCheckout = 0, quantity = 0) {
    console.log('parametri in arrivo a addToCart(utils)', variantsIdVIno, idCheckout, quantity);
    return new Promise((resolve, reject) => {
        return shopifyApi.fetchById(variantsIdVIno)
            .then(vino => {
                console.log('vino tornato dal fetch', vino);
                if (vino) {
                    return shopifyApi.addLineItems(idCheckout, aggiungiVino(vino, quantity))
                        .then((checkout) => {
                            var numeroViniInCassa = controlloNumeroVini(checkout);
                            console.log('ci sono', numeroViniInCassa, 'vini in cassa');
                            console.log('puoi controllare a questo link --->', checkout.webUrl);
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
