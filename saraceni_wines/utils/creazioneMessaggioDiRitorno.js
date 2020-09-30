var Promise = require('bluebird');

var creazioneMessaggioDiRitorno = function (messages) {
    return new Promise((resolve, reject) => {
        var messaggi = [];
        messages.forEach(message => {
            if (typeof (message) === "string") {
                var messaggio = {};
                messaggio.message = message;
                messaggi.push(messaggio);
            } else {
                var messaggio = {};
                messaggio = {
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "generic",
                            "elements": []
                        }
                    }
                };
                messaggio.attachment.payload.elements = message;
                messaggi.push(messaggio);
            }
        })
        console.log('\n\n\n\n\n\n\nmessaggio di ritorno --->', messaggi);
        resolve(messaggi);
        return messaggi;
    })
};

module.exports = creazioneMessaggioDiRitorno;