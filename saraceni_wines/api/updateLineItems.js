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
var lineItemId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dExpbmVJdGVtLzM2MjYyMDUyNTkzODMwMD9jaGVja291dD1hZDczZTZhMWMyNDEzZTRkM2U0ZDNmZjY1MDJjMzI2NQ==';

const lineItemsToUpdate = [{
  id: lineItemId,
  quantity: 5
}];

// Update the line item on the checkout (change the quantity or variant)
var updateLineItems = function (checkoutId, lineItemsToUpdate) {
  return new Promise((resolve, reject) => {
    return client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then((checkout) => {
      // Do something with the updated checkout
      console.log('id we need to remember to update this particular lineitem');
      // console.log('checkout.lineItems[0].id ---> ', checkout.lineItems[0].id);// Array with one additional line item
      resolve(checkout);
    })
      .catch(error => {
        console.log('error ---> ', error);
        reject(error);
      })
  })
}

// updateLineItems(checkoutId, lineItemsToUpdate);
