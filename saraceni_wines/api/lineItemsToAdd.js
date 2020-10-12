// import Client from 'shopify-buy';
global.fetch = require('node-fetch');
var Client = require('shopify-buy');
var config = require('../config/config');

// Initializing a client to return content in the store's primary language
const client = Client.buildClient(config.dev2);

// console.log("client", client);

var checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC83Nzg4YTkxZGFkMzRjNzhmZWY5ZDk4ZWVhMjkwYzc3Mj9rZXk9NWE4ZjE0NjE1ZTcwMGMzNzU0MGU2MmZlYzRjYzhkY2M=';
var productId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU3MzMxMjk0NTM3MzQ=';
var productVariantId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNjQwMzUzNzk2OTMxOA==';
var productInfo;

const lineItemsToAdd = [{
    variantId: productVariantId,
    quantity: 5
}];

// Add an item to the checkout
var addLineItems = function (checkoutId, lineItemsToAdd) {
    return new Promise((resolve, reject) => {
        return client.checkout.addLineItems(checkoutId, lineItemsToAdd)
            .then((checkout) => {
                // Do something with the updated checkout
                console.log('checkout.id  ---> ', checkout.id); // Array with one additional line item
                console.log('checkout.lineItems.length ---> ', checkout.lineItems.length); // Array with one additional line item
                // console.log('checkout.lineItems[0].quantity  ---> ', checkout.lineItems[0].quantity); // Array with one additional line item
                console.log('checkout function ---> ', checkout);
                console.log('checkout successo');
                resolve(checkout);
                return checkout;
            })
            .catch(error => {
                console.log('errore nella addLineItems', error);
                reject(error);
            });
    })
};

// addLineItems(checkoutId, lineItemsToAdd);

module.exports = addLineItems;
