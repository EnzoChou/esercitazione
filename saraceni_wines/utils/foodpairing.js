var Promise = require('bluebird');
var shopifyApi = require('../api/shopifyApi');
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
        if (risultatoArrayVini.length > 0) {
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
                postbackButton.payload = '000action:12345,12345||[\"add_to_cart=>' + vino.variants[0].id + ',1\"]000';
                var postBackButton2 = {};
                postBackButton2.type = 'postback';
                postBackButton2.title = 'add 3 to cart';
                postBackButton2.payload = '000action:12345,12345||[\"add_to_cart=>' + vino.variants[0].id + ',1\"]000';
                var postBackButton3 = {};
                postBackButton3.type = 'web_url';
                postBackButton3.title = 'find out more';
                postBackButton3.payload = '000action:12345,12345||[\"add_to_cart=>' + vino.description + ',1\"]000';
                buttons.push(postbackButton);
                buttons.push(postBackButton2);
                buttons.push(webUrlButton);
                var element = {};
                element.title = vino.title;
                element.image_url = vino.variants[0].image.src;
                element.subtitle = 'Price: ' + vino.variants[0].price;
                element.buttons = buttons;
                arrayDiElements.push(element);
            });

            messages[1].attachment.payload.elements = arrayDiElements;

            resolve(messages);
        } else {
            var messages = ['Sorry, I haven\'t found any wines'];
            return creazioneMessaggioDiRitorno(messages)
            .then(messages => {
                resolve(messages);
            });
        }
    });
};



function processing(text, param) {
    return cercaArrayVini(text)
        .then(risultatoArrayVini => {
            var promises = [];
            risultatoArrayVini.forEach(vino => {
                promises.push(shopifyApi.fetchById(vino.id));
            })
            return Promise.all(promises)
                .then(arrayViniDaShopify => {
                    if (arrayViniDaShopify && arrayViniDaShopify.length > 0) {
                        arrayViniDaShopify = arrayViniDaShopify.filter(elem => {
                            return elem !== undefined
                        });
                        console.log('\n\narrayViniTornatiDaShopify ---> ', arrayViniDaShopify);
                        return create_foodpairing_messages(arrayViniDaShopify, param);
                    }
                })
        });
}

exports.processing = processing;

