var Promise = require('bluebird');

function processing(user, event, param) {
    return new Promise((resolve, reject) => {
      console.log('param', param);
  
      var utilsRetrieveDetails = require('../utils/retrieveDetails');
      var send_message = require('../utils/send_message');
  
      var message_text = 'i\'m watching harry potter tonight and i\'d like some nachos';
  
      console.log('message_text', message_text);
  
      var id_recipient = "3581882641842282";

      var idVino = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU3MzMxMjk0NTM3MzQ=';
  
      console.log('id_recipient', id_recipient);
  
      return utilsRetrieveDetails.processing(idVino)
        .then(messages => {
            console.log('messaggi da inviare ---> ', messages);
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
  
  processing({},{}, 'banana');
  
  exports.processing = processing;