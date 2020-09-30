function processing(user, event, param) {
    return new Promise((resolve, reject) => {
        console.log('param', param);

        var utils_show_cart = require('../utils/show_cart');
        var send_message = require('../utils/send_message');

        var message_text = 'i\'m watching harry potter tonight and i\'d like some nachos';

        console.log('message_text', message_text);

        var id_recipient = "3581882641842282";

        console.log('id_recipient', id_recipient);

        return utils_show_cart.processing(id_recipient, message_text)
            .then(messages => {
                return send_message.all_messages(id_recipient, messages);
            })
            .then(res_final => {
                console.log("Fine");
                return;
            })
            .catch(error => {
                console.log(error);
                return;
            });

    });
}
exports.processing = processing;