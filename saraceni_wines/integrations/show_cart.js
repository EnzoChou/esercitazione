var Promise = require('bluebird');

function processing(user, event, param) {
    return new Promise((resolve, reject) => {
        console.log('param', param);

        var utils_show_cart = require('../utils/showCart');
        var send_message = require('../utils/send_message');
        var controlloCheckoutId = require('../utils/controlloCheckoutId');

        var message_text = 'i\'m watching harry potter tonight and i\'d like some nachos';

        console.log('message_text', message_text);

        var id_recipient = "3581882641842282";

        var checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9hZDczZTZhMWMyNDEzZTRkM2U0ZDNmZjY1MDJjMzI2NT9rZXk9YWQ1ZGRhNjU2ODdjOTk3NTA0MDFhYzRiNDJhOWMzNGI=';

        user.checkoutId = checkoutId;

        console.log('id_recipient', id_recipient);
        return controlloCheckoutId(user.checkoutId)
            .then(idRitornato => {
                user.checkoutId = idRitornato;
                return utils_show_cart.processing(user.checkoutId);
            })
            .then(messages => {
                console.log('messaggi arrivati in show_cart("./integrations") ---> ',
                messages );
                return send_message.all_messages(id_recipient, messages);
            })
            .then(res_final => {
                console.log("Fine");
                resolve(res_final);
                return;
            })
            .catch(error => {
                console.log('errore nella show_cart', error);
                reject(error);
                return;
            });

    });
}

processing({}, {}, 'ciao');

exports.processing = processing;