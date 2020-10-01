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
var productId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU3NzA5ODUwNDYxODI=';
var productVariantId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNjQwMzUzNzk2OTMxOA==';
var productInfo;

var createCheckout = function () {
    return new Promise((resolve, reject) => {
        client.checkout.create()
            .then((checkout) => {
                // Do something with the checkout
                checkoutId = checkout.id;
                console.log('checkout.webUrl ---> ', checkout.webUrl);
                console.log('checkoutId ---> ', checkoutId);
                resolve(checkout);
                return checkout;
            })
            .catch(error => {
                console.log('error', error);
                reject(error);
            });
    });
};

// createCheckout();

// Remove an item from the checkout
var removeLineItems = function (checkoutId, lineItemIdsToRemove) {
    return new Promise((resolve, reject) => {
        client.checkout.removeLineItems(checkoutId, lineItemIdsToRemove).then((checkout) => {
            // Do something with the updated checkout
            console.log(checkout.lineItems); // Checkout with line item 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=' removed
            resolve(checkout);
        })
        .catch(err => {
            console.log('qualcosa non è andato nella rimozione dell\'elemento', err);
            reject(err);
        })
    });
};

// removeLineItems(checkoutId, 'Z2lkOi8vc2hvcGlmeS9DaGVja291dExpbmVJdGVtLzM2MjYyMDUyNTkzODMwMD9jaGVja291dD1hZDczZTZhMWMyNDEzZTRkM2U0ZDNmZjY1MDJjMzI2NQ==');

var shopify = {};

shopify.createCheckout = createCheckout;

module.exports = shopify;
