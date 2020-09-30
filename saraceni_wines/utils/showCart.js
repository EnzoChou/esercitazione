var Promise = require('bluebird');
var checkoutFetch = require('../api/checkoutFetch');
var createCheckout = require('../api/create');

var nonAveviIlCarrello =
    'Non avevi il carrello, così ne ho creato uno per te adesso';
var nonPuoiCompletareLAcquisto =
    'Devi acquistare almeno tre vini per poter fare il checkout';
var url = 'https://il-saraceno.it/wp-content/uploads/2020/08/photo_2020-08-04_12-17-54.jpg';

var costruttoreMessaggio = function (text) {
    return new Promise((resolve, reject) => {
        var messaggi = [];
        var messaggio = {};
        if (text) {
            messaggio.text = text;
        } else {
            messaggio = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": []
                    }
                }
            };
            var arrayDiElements = [];
            var buttons = [];
            var webUrlButton = {};
            webUrlButton.type = 'web_url';
            webUrlButton.url = 'www.urlToSend.com';
            webUrlButton.title = 'go to cart';
            anotherWebUrlButton = {};
            buttons.push(webUrlButton);
            var element = {};
            element.title = 'Cart';
            element.image_url = url;
            element.subtitle = '';
            element.buttons = buttons;
            arrayDiElements.push(element);
            messaggio.attachment.payload.elements = arrayDiElements;
        }
        messaggi.push(messaggio);
        resolve(messaggi);
        return messaggi;
    })
};

// console.log('costruttoreMessaggio', costruttoreMessaggio('ciao'));

var createShowCartMessages = function (text) {
    return new Promise((resolve, reject) => {
        var messages = [];
        costruttoreMessaggio(text)
            .then(messaggio => {
                messages.push(messaggio);
                resolve(messages);
                return messages;
            })
            .catch(err => console.log(err));
    });
}

// createShowCartMessages().then(sms => console.log('sms', sms));

var processing = function (user) {
    if (user.checkoutId) {
        console.log('entra nella condizione');
        return checkoutFetch(user.checkoutId)
            .then(checkoutCart => {
                console.log('entra nella seconda condizione');
                if (checkoutCart.lineItems.length < 3) {
                    var text = nonPuoiCompletareLAcquisto;
                    createShowCartMessages(text)
                    .then(mess => {
                        return mess;
                    })
                        .catch(err => console.log('err', err));
                } else {
                    console.log('entra nel secondo else');
                    return createShowCartMessages()
                        .then(mess => {
                            return mess
                        })
                        .catch(err => console.log('err', err));
                }
            })
            .catch(err => {
                console.log('err', err);
            })
    } else {
        console.log('entra nell\' else');
        return createCheckout()
            .then(checkoutCart => {
                var text = nonAveviIlCarrello;
                user.checkoutId = checkoutCart.id;
                createShowCartMessages(text)
                .then(mess => {
                    return mess;
                });
            })
            .catch(err => {
                console.log('err', err);
            })
    }
}
/*
var processing = function (user) {
    console.log('sto processando show cart');
    return new Promise((resolve, reject) => {
        if (user.checkoutId) {
            console.log('sono entrato nell\'if');
            return checkoutFetch(user.checkoutId)
                .then(checkoutCart => {
                    var text;
                    if (checkoutCart.lineItems.length < 3) {
                        text = nonPuoiCompletareLAcquisto;
                    }
                    console.log('checkoutCart ---> ', checkoutCart);
                    resolve(createShowCartMessages(text));
                    return createShowCartMessages(text);
                })
                .catch(
                    error => {
                        console.log('c\'è stato un errore nel processing di showCart',
                            error);
                        reject(error);
                    }
                );
        } else {
            console.log('sono entrato nell\'else');
            return createCheckout()
                .then(checkoutCart => {
                    var text = nonAveviIlCarrello;
                    user.checkoutId = checkoutCart;
                    resolve(createShowCartMessages(text));
                    return createShowCartMessages(text);
                })
                .catch(err => {
                    console.log('c\'è stato un errore alla creazione del checkout',
                        err);
                })
        }
    })
};
*/
processing({checkoutId: 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9hZDczZTZhMWMyNDEzZTRkM2U0ZDNmZjY1MDJjMzI2NT9rZXk9YWQ1ZGRhNjU2ODdjOTk3NTA0MDFhYzRiNDJhOWMzNGI'});

module.exports = processing;