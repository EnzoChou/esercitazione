function processing(user, event, param) {
  return new Promise((resolve, reject) => {
    console.log("asdfghjkl foodpairing")
    console.log("event.message.text", event.message.text);
    console.log("param", param);

    var message_text = event.message.text;
    console.log("message_text", message_text);

    var foodpairing_seach = external_services.saraceni_wines.integrations.ricercaVini;
    var result = foodpairing_seach.metodoScelto(message_text);

    console.log("result", result);
    var messages = [{
      "text": "Ecco a te i vini:"
    }];
    result.forEach(elem => {
      messages.push({
        title: elem['title'],
        // subtitle: element['streetAddress'] + ", " + element['locality'],
        // image_url: "https://s3-eu-west-1.amazonaws.com/media-hej/Renault%20Dealer/image/1591968591175.png",
        buttons: [{
          type: "web_url",
          title: "SELEZIONA",
          url: "https://www.saraceniwines.com/"
        }]
      });
    });

    resolve({
      'replace': true,
      'msg': messages
    });

    // return yeah(event)
    //     .find_content_plus(user, event, {
    //         "payload": "RESULTS_FOODPAIRING",
    //         "context.context": user.id_context
    //     })
    //     .then(content_found => {
    //         console.log("saraceni foodparing content_found", content_found);
    //         if (content_found) {
    //             content_found.messages.unshift({
    //                 'text': 'Vino: ' + result
    //             });
    //             resolve({
    //                 'content_found': content_found,
    //             });
    //         } else {
    //             resolve({
    //                 replace: true,
    //                 msg: {
    //                     "text": "Non ho trovato il messaggio in cui stampare le ricette"
    //                 }
    //             });
    //         }
    // });

  });
}
exports.processing = processing;