// import Client from 'shopify-buy';
global.fetch = require('node-fetch');
var Client = require('shopify-buy');

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
    domain: 'test-hej.myshopify.com',
    storefrontAccessToken: 'ab5232770d3011658fd90b0cf536a8c0'
});

// console.log("client", client);

var checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9hZDczZTZhMWMyNDEzZTRkM2U0ZDNmZjY1MDJjMzI2NT9rZXk9YWQ1ZGRhNjU2ODdjOTk3NTA0MDFhYzRiNDJhOWMzNGI=';
var productId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU3MzMxMjk0NTM3MzQ=';
var productVariantId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNjI2MjA1MjU5MzgzMA==';
var productInfo;

const lineItemsToAdd = [{
    variantId: productVariantId,
    quantity: 5,
    customAttributes: [{
        key: 'MyKey',
        value: 'MyValue'
    }]
}];

// Add an item to the checkout
var addLineItems = function (checkoutId, lineItemsToAdd) {
    return new Promise((resolve, reject) => {
        return client.checkout.addLineItems(checkoutId, lineItemsToAdd)
            .then((checkout) => {
                // Do something with the updated checkout
                // console.log('checkout.id  ---> ', checkout.id); // Array with one additional line item
                // console.log('checkout.lineItems 1  ---> ', checkout.lineItems); // Array with one additional line item
                // console.log('checkout.lineItems[0].quantity  ---> ', checkout.lineItems[0].quantity); // Array with one additional line item
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