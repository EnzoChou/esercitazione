var Promise = require('bluebird');
var request = require('request');

function single_message(id, message) {
    return new Promise(function (resolve, reject) {
        var body = {
            "recipient": {
                "id": id
            },
            "message": message
        };

        var options = {
            'method': 'POST',
            'url': 'https://graph.facebook.com/v2.6/me/messages?access_token=EAADtbsZAAQL8BAPB3g0Nam6WKFMQZAQJyw0R2pHfjWiv4AKvScx1G5rFLv2pa1NpJlju2rUab3rqZBEuhtCy9pFwZAn1ZCYOXuowLHdbJZCxKepsNo8qmig7R1sw0qRLZBBJbKUdxhVCvaegZBY9H3hP8DEnys2eavXV9SLhxQLjGcSSfZCbuJrKEjdU7OPFdNqAZD',
            'headers': {
                'Content-Type': 'application/json'
            }
        };

        options.body = JSON.stringify(body);
        console.log('\n\n\noptions', options,'\n\n\n\n');
        request(options, function (error, response) {
            if (error) reject();
            console.log(response.body);
            resolve(response.body)
        });
    });
}

function all_messages(id, messages) {
    return new Promise(function (resolve, reject) {
        return Promise.each(messages, function (message) {
                return single_message(id, message);
            })
            .then(message_sended => {
                console.log("message_sended", message_sended);
                resolve(message_sended);
            })
            .catch(err => {
                console.log("Si è verificato un errore", err);
                reject(err);
            });
    });
};

exports.single_message = single_message;
exports.all_messages = all_messages;
