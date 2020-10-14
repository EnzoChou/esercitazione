var Promise = require('bluebird');
var shopifyApi = require('../api/shopifyApi');
var ricercaVini = require('../script/ricercaVini');
var creazioneMessaggioDiRitorno = require('../utils/creazioneMessaggioDiRitorno');

var cercaArrayVini = function (parole, suggestions) {
    return new Promise((resolve, reject) => {
        resolve(ricercaVini.metodoScelto(parole, suggestions))
            .catch(error => reject(console.log('c\'è stato un errore', error)));
    })
};

var create_foodpairing_messages = function (risultatoArrayVini, checkout) {
    return new Promise((resolve, reject) => {
        var messages = [];
        if (risultatoArrayVini.length > 0) {
            messages.push({
                "text": "These wines look perfect for you:"
            });

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
                    'buttons': [{
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

var conteggioVini = function (risultatoArrayVini, checkout) {
    var quantity = 0;
    if (checkout.quantity) {
        quantity = checkout.quantity;
    }
    risultatoArrayVini.forEach(vinoTrovato => {
        quantity += vinoTrovato.quantity;
    });
    return quantity;
};

function processing(text, suggestions, checkout) {
    return cercaArrayVini(text, suggestions)
        .then(risultatoArrayVini => {
            // ---> checkout.quantity = conteggioVini(risultatoArrayVini, checkout);
            // var reducer = (accumulator, currentValue) => accumulator + currentValue;
            // var quantity = risultatoArrayVini.map(elem => elem.quantity).reduce(reducer);
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
                        arrayViniDaShopify.map(vinoShopify => {
                            var quantity = risultatoArrayVini.find(vino => vinoShopify.id == vino.id).quantity;
                            vinoShopify.quantity = quantity;
                        })
                        console.log('\n\narrayViniTornatiDaShopify ---> ', arrayViniDaShopify);
                        return create_foodpairing_messages(arrayViniDaShopify, checkout);
                    }
                })
        });
}

exports.processing = processing;