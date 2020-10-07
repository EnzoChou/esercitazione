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

var checkoutFetch = function (checkoutId) {
  console.log('ID MANDATO PER IL CHECKOUT ---> ', checkoutId);
  return new Promise((resolve, reject) => {
    return client.checkout.fetch(checkoutId)
      .then(checkout => {
        // Do something with the checkout
        console.log('checkout ---> ', checkout);
        console.log('checkout.id ---> ', checkout.id);
        // console.log('checkout.lineItems[0].id ---> ', checkout.lineItems[0].id);
        // console.log('checkout.lineItems[0].quantity ---> ', checkout.lineItems[0].quantity);
        console.log('checkout.lineItems.length --->', checkout.lineItems.length);
        if(checkout.lineItems.length>0){
          checkout.lineItems.forEach(elem => {
            console.log('\n\ntitolo', elem.title);
            console.log('\n\nquantity', elem.quantity);
            console.log('\n\nlineItem id', elem.id);
          })
        }
        console.log('checkout.order --->', checkout.order);
        resolve(checkout);
        return checkout;
      })
      .catch(err => {
        console.log('errore in checkout fetch', err);
        reject(err);
      });
  })
};

// checkoutFetch(checkoutId);

module.exports = checkoutFetch;