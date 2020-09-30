var Promise = require('bluebird');
var fetch = require('../api/fetch');
var request = require('request');
var ricercaVini = require('../script/ricercaVini');
const {
    func
} = require('joi');

var cercaArrayVini = function (parole) {
    return new Promise((resolve, reject) => {
        resolve(ricercaVini(parole))
            .catch(error => reject(console.log('c\'è stato un errore', error)));
    })
};

var create_foodpairing_messages = function (risultatoArrayVini) {
    return new Promise((resolve, reject) => {
        var messages = [{
            "text": "Ecco a te i vini che ho trovato in base alla tua ricetta:"
        }, {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": []
                }
            }
        }];

        var arrayDiRitorno = [];

        risultatoArrayVini.forEach(vino => {
            var button = {};
            var buttons = [];
            button.type = 'postback';
            button.title = 'discover more';
            button.payload = '000action:12345,12345||[\"add_to_cart=>' + vino.id + ',1\"]000';
            buttons.push(button);
            var element = {};
            element.title = vino.nome;
            element.image_url = 'https://upload.wikimedia.org/wikipedia/commons/8/88/Glass_of_Red_Wine_with_a_bottle_of_Red_Wine_-_Evan_Swigart.jpg';
            element.subtitle = 'Prezzo: ' + vino.prezzo;
            element.buttons = buttons;
            arrayDiRitorno.push(element);
        });

        messages[1].attachment.payload.elements = arrayDiRitorno;

        resolve(messages)
            .catch(error => {
                reject();
            });
    });
}

function processing(id_recipient, text) {
    return cercaArrayVini(text)
        .then(risultatoArrayVini => {
            return create_foodpairing_messages(risultatoArrayVini);
        });

}
exports.processing = processing;

