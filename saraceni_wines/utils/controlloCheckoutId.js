var Promise = require('bluebird');
var create = require('../api/create');

var controlloCheckoutId = function(id) {
    return new Promise ((resolve, reject) => {
        if(!id) {
            return create()
            .then(checkout => {
                resolve(checkout.id);
                return checkout.id;
                })
                .catch(err => {
                    console.log('err nel controllo id', err)
                    reject(err);
                })
        } else {
            return id;
        }
    })
};

module.exports = controlloCheckoutId;