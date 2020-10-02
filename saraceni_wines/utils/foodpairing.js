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
        var messages = [];
        if (risultatoArrayVini.length > 0) {
            messages.push({ "text": "These wines look perfect for you:" });

            var attachment = {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": []
                }
            };

            var arrayOfElements = [];

            risultatoArrayVini.forEach(vino => {
                var element = {
                    'title': vino.title,
                    'image_url': vino.variants[0].image.src,
                    'subtitle': 'Price: ' + vino.variants[0].price,
                    'buttons': [
                        {
                            'type': 'postback',
                            'title': 'add 1 to cart',
                            'payload': '000action:12345,12345||[\"add_to_cart=>' + vino.variants[0].id + ',1\"]000'

                        },
                        {
                            'type': 'postback',
                            'title': 'add 3 to cart',
                            'payload': '000action:12345,12345||[\"add_to_cart=>' + vino.variants[0].id + ',3\"]000'
                        },
                        {
                            'type': 'postback',
                            'title': 'find out more',
                            'payload': '000action:12345,12345||[\"retrieveDetails=>' + vino.id + ',1\"]000'
                        }
                    ]
                };
                arrayOfElements.push(element);
            })
            attachment.payload.elements = arrayOfElements;
            messages.push(attachment);
            console.log('attachment to be sent ----> ', attachment);
        } else {
            messages.push('Sorry, I haven\'t found any wines');
        }
        return creazioneMessaggioDiRitorno(messages)
            .then(messages => {
                resolve(messages);
            });
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

