var Promise = require('bluebird');
var fetch = require('../api/fetch');
var request = require('request');
var ricercaVini = require('../script/ricercaVini');

var parole = 'i\'m watching harry potter tonight and i\'d like some nachos';

var bodyJson = {
    "recipient": {
        "id": "3581882641842282"
    },
    "message": {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic"
            }
        }
    }
};

var options = {
    'method': 'POST',
    'url': 'https://graph.facebook.com/v2.6/me/messages?access_token=EAADtbsZAAQL8BAPB3g0Nam6WKFMQZAQJyw0R2pHfjWiv4AKvScx1G5rFLv2pa1NpJlju2rUab3rqZBEuhtCy9pFwZAn1ZCYOXuowLHdbJZCxKepsNo8qmig7R1sw0qRLZBBJbKUdxhVCvaegZBY9H3hP8DEnys2eavXV9SLhxQLjGcSSfZCbuJrKEjdU7OPFdNqAZD',
    'headers': {
        'Content-Type': 'application/json'
    }
};

var cercaArrayVini = function (parole) {
    return new Promise((resolve, reject) => {
        resolve(ricercaVini(parole))
            .catch(error => reject(console.log('c\'è stato un errore', error)));
    })
};
// var arrayTrovati = cercaArrayVini(parole);
// console.log('cercaArrayVini ---> ', arrayTrovati);

var popolaElements = function (arrayVini) {
    var arrayDiRitorno = [];
    arrayVini.forEach(vino => {
        var button = {};
        var buttons = [];
        button.type = 'postback';
        button.title = 'discover more';
        button.payload = '000action:12345,12345||[\"add_to_cart=>' + vino.id + ',1\"]000';
        buttons.push(button);
        var element = {};
        element.title = vino.nome;
        element.image_url = 'https://upload.wikimedia.org/wikipedia/commons/8/88/Glass_of_Red_Wine_with_a_bottle_of_Red_Wine_-_Evan_Swigart.jpg';
        element.subtitle = 'Prezzo: ' + vino.prezzo;
        element.buttons = buttons;
        arrayDiRitorno.push(element);
    });
    return arrayDiRitorno;
}

/*

var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://graph.facebook.com/v2.6/me/messages?access_token=EAADtbsZAAQL8BAPB3g0Nam6WKFMQZAQJyw0R2pHfjWiv4AKvScx1G5rFLv2pa1NpJlju2rUab3rqZBEuhtCy9pFwZAn1ZCYOXuowLHdbJZCxKepsNo8qmig7R1sw0qRLZBBJbKUdxhVCvaegZBY9H3hP8DEnys2eavXV9SLhxQLjGcSSfZCbuJrKEjdU7OPFdNqAZD',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({"recipient":{"id":"3581882641842282"},"message":{"attachment":{"type":"template","payload":{"template_type":"generic","elements":[{"title":"Vino 1","image_url":"https://upload.wikimedia.org/wikipedia/commons/8/88/Glass_of_Red_Wine_with_a_bottle_of_Red_Wine_-_Evan_Swigart.jpg","subtitle":"Prezzo: 50$","buttons":[{"type":"postback","title":"Start Chatting","payload":"000action:12345,12345||[\"add_to_cart=>1234567890,1\"]000"}]}]}}}})

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

*/

/*
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://graph.facebook.com/v2.6/me/messages?access_token=EAADtbsZAAQL8BAPB3g0Nam6WKFMQZAQJyw0R2pHfjWiv4AKvScx1G5rFLv2pa1NpJlju2rUab3rqZBEuhtCy9pFwZAn1ZCYOXuowLHdbJZCxKepsNo8qmig7R1sw0qRLZBBJbKUdxhVCvaegZBY9H3hP8DEnys2eavXV9SLhxQLjGcSSfZCbuJrKEjdU7OPFdNqAZD',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({"recipient":{"id":"3581882641842282"},"message":{"attachment":{"type":"template","payload":{"template_type":"generic","elements":[{"title":"Vino 1","image_url":"https://upload.wikimedia.org/wikipedia/commons/8/88/Glass_of_Red_Wine_with_a_bottle_of_Red_Wine_-_Evan_Swigart.jpg","subtitle":"Prezzo: 50$","buttons":[{"type":"postback","title":"Start Chatting","payload":"000action:12345,12345||[\"add_to_cart=>1234567890,1\"]000"}]}]}}}})

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
*/

var parseJsonDiRispostaAlgoritmoPerMessenger = function () {
    return new Promise(function (resolve, reject) {

    })
};

var costruzioneBody = function (risultatoArrayVini) {
    return new Promise((resolve, reject) => {
        bodyJson.message.attachment.payload.elements = popolaElements(risultatoArrayVini);
        options.body = JSON.stringify(bodyJson);
        resolve(options)
            .catch(error => {
                reject(error);
            });
    })
}

var richiesta = function (options) {
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
};

cercaArrayVini(parole)
    .then(risultatoArrayVini =>
        costruzioneBody(risultatoArrayVini))
    .then(options =>
        richiesta(options))
    .catch(error => console.log(error));