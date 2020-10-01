var Promise = require('bluebird');
var fetch = require('../api/fetch');
creazioneMessaggioDiRitorno = require('./creazioneMessaggioDiRitorno');

var retrieveDetails = function (idVino) {
    return new Promise((resolve, reject) => {
        return fetch(idVino)
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
                                "type": "web_url",
                                "url": "https://www.urltoGet1bottle.com",
                                "title": "get 1 bottle"
                            },
                            {
                                "type": "web_url",
                                "url": "https://www.urltoGet3bottle.com",
                                "title": "get 3 bottles"
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