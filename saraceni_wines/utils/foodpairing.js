var Promise = require('bluebird');
var fetch = require('../api/fetch');
var ricercaVini = require('../script/ricercaVini');

var cercaArrayVini = function (parole) {
    return new Promise((resolve, reject) => {
        resolve(ricercaVini(parole))
            .catch(error => reject(console.log('c\'è stato un errore', error)));
    })
};

var create_foodpairing_messages = function (risultatoArrayVini) {
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
            postbackButton.title = 'find out';
            postbackButton.payload = '000action:12345,12345||[\"add_to_cart=>' + vino.id + ',1\"]000';
            var webUrlButton = {};
            webUrlButton.type = 'web_url';
            webUrlButton.url = 'www.urlToSend.com';
            webUrlButton.title = 'Add 1 bottle';
            anotherWebUrlButton = {};
            anotherWebUrlButton.type = 'web_url';
            anotherWebUrlButton.url = 'www.urlToSend2Avenge.com';
            anotherWebUrlButton.title = 'add ' + 3 + ' bottles';
            buttons.push(postbackButton);
            buttons.push(webUrlButton);
            buttons.push(anotherWebUrlButton);
            var element = {};
            element.title = vino.nome;
            element.image_url = vino.immagine;
            element.subtitle = 'Prezzo: ' + vino.prezzo;
            element.buttons = buttons;
            arrayDiElements.push(element);
        });

        messages[1].attachment.payload.elements = arrayDiElements;

        resolve(messages)
            .catch(error => {
                reject(error);
            });
    });
}

function processing(text) {
    return cercaArrayVini(text)
        .then(risultatoArrayVini => {
            return create_foodpairing_messages(risultatoArrayVini);
        });
}

exports.processing = processing;

