var Promise = require('bluebird');
var create = require('../api/create');
var creazioneMessaggioDiRitorno = require('./creazioneMessaggioDiRitorno');
var sendMessages = require('./send_message');

var controlloCheckoutId = function (id) {
    return new Promise((resolve, reject) => {
        if (!id) {
            return creazioneMessaggioDiRitorno()
                .then(messages => {
                    sendMessages(messages);
                    return create();
                })
                .then(checkout => {
                    console.log('ti ho ricreato l\'id', checkout.id);
                    resolve(checkout.id);
                    return checkout.id;
                })
                .catch(err => {
                    console.log('err nel controllo id', err)
                    reject(err);
                })
        } else {
            console.log('avevi già l\'id e te lo ridò uguale', id);
            resolve(id);
            return id;
        }
    })
};

module.exports = controlloCheckoutId;