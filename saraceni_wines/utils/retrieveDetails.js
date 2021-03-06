var Promise = require('bluebird');
var shopifyApi = require('../api/shopifyApi');
creazioneMessaggioDiRitorno = require('./creazioneMessaggioDiRitorno');

var retrieveDetails = function (idVino) {
    return new Promise((resolve, reject) => {
        return shopifyApi.fetchById(idVino)
            .then(vino => {
                console.log('vino trovato ---> ', vino);
                var vinoDescription = vino.description;
                if(!vinoDescription) {
                    vinoDescription = 'it\'s really tasty';
                }
                var messaggi = [{
                    "type": "image",
                    "payload": {
                        "url": vino.variants[0].image.src,
                        "is_reusable": true
                    }
                },
                vinoDescription,
                {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": "Wanna get some?",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "get 1 bottle",
                                "payload": "payloadToBePlayed"
                            },
                            {
                                "type": "postback",
                                "title": "get 3 bottles",
                                "payload": "payloadTobePlayed"
                            }]
                    }
                }];
                return creazioneMessaggioDiRitorno(messaggi)
                    .then(messages => {
                        resolve(messages);
                        return messages;
                    });
            })
            .catch(err => {
                console.log('errore nel retrieveDetails', err);
                reject(err);
            })
    })
};

module.exports.processing = retrieveDetails;