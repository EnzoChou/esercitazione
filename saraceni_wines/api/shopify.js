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
var productId;
var productVariantId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNjI2MjA1MjU5MzgzMA==';
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

var shopify = {};

shopify.createCheckout = createCheckout;

module.exports = shopify;
