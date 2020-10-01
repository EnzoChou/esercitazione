var Promise = require('bluebird');
var create = require('../api/create');
var creazioneMessaggioDiRitorno = require('./creazioneMessaggioDiRitorno');
var sendMessages = require('./send_message');

var controlloCheckoutId = function (checkoutId, idRecipient) {
    return new Promise((resolve, reject) => {
        if (!checkoutId) {
            var messaggi = ['you didn\'t have a cart, i just made one for you!'];
            return creazioneMessaggioDiRitorno(messaggi)
                .then(messages => {
                    console.log('messages to send --->', messages);
                    return sendMessages.all_messages(idRecipient, messages);
                })
                .then(obj => {
                    return create();
                })
                .then(checkout => {
                    console.log('ti ho ricreato l\'checkoutId', checkout.id);
                    resolve(checkout.id);
                    return checkout.id;
                })
                .catch(err => {
                    console.log('err nel controllo checkoutId', err)
                    reject(err);
                })
        } else {
            console.log('avevi già l\'checkoutId e te lo ridò uguale', checkoutId);
            resolve(checkoutId);
            return checkoutId;
        }
    })
};

module.exports = controlloCheckoutId;