function processing(user, event, param) {
    return new Promise((resolve, reject) => {
        console.log('param', param);

        var utils_add_to_cart = require('../utils/addToCart');
        var send_message = require('../utils/send_message');
        var controlloId = require('../utils/controlloCheckoutId');

        var message_text = 'i\'m watching harry potter tonight and i\'d like some nachos';

        console.log('message_text', message_text);

        var id_recipient = "3581882641842282";

        var idVino = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNjQwMzUzNzk2OTMxOA==';

        var quantity = 1;

        console.log('id_recipient', id_recipient);

        return controlloId(user.checkoutId, id_recipient)
            .then(checkoutId => {
                console.log('invio idVino, checkoutId, quantity ---> ', idVino,'\n', checkoutId, '\n', quantity);
                 return utils_add_to_cart.processing(idVino, checkoutId, quantity);
            })
            .then(messages => {
                console.log('entrato nel lato messaggi da inviare -->',
                messages);
                return send_message.all_messages(id_recipient, messages);
            })
            .then(res_final => {
                console.log("Fine");
                resolve(res_final);
                return;
            })
            .catch(error => {
                console.log(error);
                return;
            });
    });
}

processing({checkoutId:'Z2lkOi8vc2hvcGlmeS9DaGVja291dC83Mjk4NDhlZDVhZTg2YmU3NmNlNzdlNjg3Y2Y1OWVmZT9rZXk9ZDE4ZjgwZWU2NjgxMDYyZDk3ODMxMmJkMzIwZDY4OTI='}, {}, 'banana');

exports.processing = processing;