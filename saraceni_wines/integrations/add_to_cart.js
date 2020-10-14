function processing(user, event, param) {
    return new Promise((resolve, reject) => {
        console.log('param', param);

        var utils_add_to_cart = require('../utils/addToCart');
        var send_message = require('../utils/send_message');
        var controlloId = require('../utils/controlloCheckoutId');

        //console.log('message_text', message_text);

        var id_recipient = "3581882641842282";

        var variantsIdVIno = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMjY3NDkwMzk0OTM5Mw==';
        var idVino = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ3MDQ1MDc4ODc2OTc=';

        var quantity = 1;

        console.log('id_recipient', id_recipient);

        return controlloId(user.checkoutId, id_recipient)
            .then(checkoutId => {
                console.log('invio variantsIdVIno, checkoutId, quantity ---> ', variantsIdVIno,'\n', checkoutId, '\n', quantity);
                 return utils_add_to_cart.processing(user, event, idVino, checkoutId, quantity);
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

// processing({checkoutId:'Z2lkOi8vc2hvcGlmeS9DaGVja291dC83NDM0NGU1ZjA1MzUzZWQ2ZTI5NGU3NDA5OTg5YWJlNj9rZXk9NjVlZGU2MmU5YTdlNjdkMmRiN2EzZTUxY2FlODEzYjI='}, {}, 'banana');

exports.processing = processing;