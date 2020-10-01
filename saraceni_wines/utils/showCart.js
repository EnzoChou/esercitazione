var Promise = require('bluebird');
var checkoutFetch = require('../api/checkoutFetch');
var createCheckout = require('../api/create');
var costruttoreMessaggio = require('./creazioneMessaggioDiRitorno');

var nonAveviIlCarrello =
    'Non avevi il carrello, così ne ho creato uno per te adesso';
var nonPuoiCompletareLAcquisto =
    'Devi acquistare almeno tre vini per poter fare il checkout';
var url = 'https://il-saraceno.it/wp-content/uploads/2020/08/photo_2020-08-04_12-17-54.jpg';

var controlloViniInCheckout = function (checkout) {
    var cont = 0;
    if(checkout.lineItems.length>0) {
        checkout.lineItems.forEach(vino => {
            cont += vino.quantity;
        })
    }
    return cont;
};

var processing = function (checkoutId) {
    var messaggiDaInviare = [];
    return new Promise((resolve, reject) => {
        if (checkoutId) {
            console.log('entra nella condizione');
            console.log('checkoutId ---> ', typeof (checkoutId));
            return checkoutFetch(checkoutId)
                .then(checkoutCart => {
                    console.log(checkoutCart);
                    console.log('entra nella seconda condizione');
                    if (controlloViniInCheckout(checkoutCart) < 3) {
                        messaggiDaInviare.push(nonPuoiCompletareLAcquisto);
                    } else {
                        console.log('entra nel secondo else');
                        messaggiDaInviare.push({
                            "type": "template",
                            "payload": {
                                "template_type": "generic",
                                "elements": [
                                    {
                                        "title": "Cart",
                                        "image_url": url,
                                        "buttons": [
                                            {
                                                "type": "web_url",
                                                "url": checkoutCart.webUrl,
                                                "title": "go to checkout"
                                            }
                                        ]

                                    }
                                ]
                            }
                        });
                    }
                    return costruttoreMessaggio(messaggiDaInviare);
                })
                .then(mess => {
                    console.log('messaggio finale prima di tornare in integrations --->',
                        mess);
                    resolve(mess);
                    return mess;
                })
        } else {
            console.log('entra nel primo else');
            return createCheckout()
                .then(checkoutCart => {
                    messaggiDaInviare.push(nonAveviIlCarrello);
                    user.checkoutId = checkoutCart.checkoutId;
                    return createShowCartMessages(messaggiDaInviare);
                })
                .then(mess => {
                    console.log('messaggio finale prima di tornare in integrations --->',
                        mess);
                    resolve(mess);
                    return mess;
                })
                .catch(err => {
                    console.log('err', err);
                })
        }
    })
}

//processing({checkoutId: 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC83Mjk4NDhlZDVhZTg2YmU3NmNlNzdlNjg3Y2Y1OWVmZT9rZXk9ZDE4ZjgwZWU2NjgxMDYyZDk3ODMxMmJkMzIwZDY4OTI='});

module.exports.processing = processing;