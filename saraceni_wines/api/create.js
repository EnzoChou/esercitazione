// import Client from 'shopify-buy';
global.fetch = require('node-fetch');
var Client = require('shopify-buy');
var config = require('../config/config');

// Initializing a client to return content in the store's primary language
const client = Client.buildClient(config.dev2);

// console.log("client", client);

var checkoutId;
var productId;
var productVariantId;
var productInfo;

var createCheckout = function () {
  return new Promise((resolve, reject) => {
    client.checkout.create()
    .then((checkout) => {
      // Do something with the checkout
      checkoutId = checkout.id;
      console.log('checkout.webUrl ---> ', checkout.webUrl);
      console.log('checkoutId ---> ', checkoutId);
      resolve(checkout)
      return checkout;
    })
    .catch(error =>
      console.log('error', error)
    );
  });
};

// createCheckout();

module.exports = createCheckout;
