var Promise = require('bluebird');
var controlloCheckoutId = require('../utils/controlloCheckoutId');

function processing(user, event, param) {
  return new Promise((resolve, reject) => {
    console.log('param', param);

    var utils_foodpairing = require('../utils/foodpairing');
    var send_message = require('../utils/send_message');

    var message_text = 'i\'m watching harry potter tonight and i\'d like some nachos';

    console.log('message_text', message_text);

    var id_recipient = "3581882641842282";

    console.log('id_recipient', id_recipient);

    return controlloCheckoutId(user.checkoutId, id_recipient)
      .then(checkoutId => {
        return utils_foodpairing.processing(message_text, checkoutId)
      })
      .then(messages => {
        return send_message.all_messages(id_recipient, messages);
      })
      .then(res_final => {
        console.log("Fine");
        resolve(res_final);
      })
      .catch(error => {
        console.log(error);
        return;
      });

  });
}

processing({checkoutId:'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9hZDczZTZhMWMyNDEzZTRkM2U0ZDNmZjY1MDJjMzI2NT9rZXk9YWQ1ZGRhNjU2ODdjOTk3NTA0MDFhYzRiNDJhOWMzNGI='}, {}, 'ciao');

exports.processing = processing;