// import Client from 'shopify-buy';
global.fetch = require('node-fetch');
var Client = require('shopify-buy');
var config = require('../config/config');

// Initializing a client to return content in the store's primary language
const client = Client.buildClient(config.dev2);

// console.log("client", client);

var checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC83NDM0NGU1ZjA1MzUzZWQ2ZTI5NGU3NDA5OTg5YWJlNj9rZXk9NjVlZGU2MmU5YTdlNjdkMmRiN2EzZTUxY2FlODEzYjI=';
var productId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU3MzMxMjk0NTM3MzQ=';
var productVariantId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ3MDQ1MDc4ODc2OTc=';
var productInfo;

const lineItemsToAdd = [{
    variantId: productVariantId,
    quantity: 1,
    customAttributes: [{key:'numeroVini', value:'1'}]
}];

// Add an item to the checkout
var addLineItems = function (checkoutId, lineItemsToAdd) {
    return new Promise((resolve, reject) => {
        return client.checkout.addLineItems(checkoutId, lineItemsToAdd)
            .then((checkout) => {
                // Do something with the updated checkout
                // console.log('checkout.id  ---> ', checkout.id); // Array with one additional line item
                // console.log('checkout.lineItems.length ---> ', checkout.lineItems.length); // Array with one additional line item
                // console.log('checkout.lineItems[0].customAttributes.find(elem => {return elem.key == "numeroVini"}).value ---> ', checkout.lineItems[0].customAttributes.find(elem => {return elem.key == "numeroVini"}).value);
                // console.log('checkout.lineItems[0].quantity  ---> ', checkout.lineItems[0].quantity); // Array with one additional line item
                // console.log('checkout.webUrl', checkout.webUrl);
                // console.log('checkout function ---> ', checkout);
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
