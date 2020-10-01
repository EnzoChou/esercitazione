var Promise = require('bluebird');

var creazioneMessaggioDiRitorno = function (messages) {
    return new Promise((resolve, reject) => {
        var messaggi = [];
        messages.forEach(message => {
            console.log('\narray messaggi prima ', messaggi);
            if (typeof (message) === "string") {                
            console.log('\nmessaggio trovato è una stringa ---> ', message);
                var messaggio = {};
                messaggio.text = message;
                messaggi.push(messaggio);
                console.log('\narray messaggi dopo ', messaggi);
            } else {
                console.log('\nmessaggio trovato non è una stringa ---> ', message);
                var messaggio = {};
                messaggio = {
                    "attachment": {
                    //    "type": "template",
                    //    "payload": {
                    //        "template_type": "generic",
                    //        "elements": []
                    //    }
                    }
                };
                // messaggio.attachment.payload.elements = message;
                console.log('\narray messaggi prima ', messaggi);
                messaggio.attachment = message;
                messaggi.push(messaggio);
                console.log('\narray messaggi dopo ', messaggi);
            }
        })
        console.log('\n\n\n\n\n\n\creazione messaggio di ritorno --->', messaggi);
        resolve(messaggi);
        return messaggi;
    })
};

// var prova = creazioneMessaggioDiRitorno(['ciao',{}]).then(obj => console.log('oggetto ritornato ---> ', obj));

module.exports = creazioneMessaggioDiRitorno;