var Promise = require('bluebird');
var fetch = require('../api/fetch');
var checkoutFetch = require('../api/checkoutFetch');
var ricercaVini = require('../script/ricercaVini');
var creazioneMessaggioDiRitorno = require('../utils/creazioneMessaggioDiRitorno');

var cercaArrayVini = function (parole) {
    return new Promise((resolve, reject) => {
        resolve(ricercaVini(parole))
            .catch(error => reject(console.log('c\'è stato un errore', error)));
    })
};

var create_foodpairing_messages = function (risultatoArrayVini, param) {
    return new Promise((resolve, reject) => {
        var messages = [{
            "text": "These wines look perfect for you:"
        }, {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": []
                }
            }

        }];

        var arrayDiElements = [];

        risultatoArrayVini.forEach(vino => {
            var postbackButton = {};
            var buttons = [];
            postbackButton.type = 'postback';
            postbackButton.title = 'add 1 to cart';
            postbackButton.payload = '000action:12345,12345||[\"add_to_cart=>' + vino.variantsId + ',1\"]000';
            var postBackButton2 = {};
            postBackButton2.type = 'postback';
            postBackButton2.title = 'add 3 to cart';
            postBackButton2.payload = '000action:12345,12345||[\"add_to_cart=>' + vino.variantsId + ',1\"]000';
            var webUrlButton = {};
            webUrlButton.type = 'web_url';
            webUrlButton.url = 'www.urlToSend2Avenge.com';
            webUrlButton.title = 'find out more';
            buttons.push(postbackButton);
            buttons.push(postBackButton2);
            buttons.push(webUrlButton);
            var element = {};
            element.title = vino.nome;
            element.image_url = vino.immagine;
            element.subtitle = 'Price: ' + vino.prezzo;
            element.buttons = buttons;
            arrayDiElements.push(element);
        });

        messages[1].attachment.payload.elements = arrayDiElements;

        resolve(messages)
            .catch(error => {
                reject(error);
            });
    });
};



function processing(text, param) {
    return cercaArrayVini(text)
        .then(risultatoArrayVini => {
            return create_foodpairing_messages(risultatoArrayVini, param);
        });
}

exports.processing = processing;

