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
var productVariantId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNjQwMzUzNzk2OTMxOA==';
var productInfo;

var fetch = function (productId) {
  return new Promise((resolve, reject) => {
    client.product.fetch(productId)
      .then((product) => {
        var vino = {};
        vino.id = product.id;
        vino.description = product.description;
        vino.descriptionHtml = product.descriptionHtml;
        vino.title = product.title;

        // Do something with the product
        productInfo = product.id;
        console.log('product.type ---> ', product.type);
        console.log('product ---> ', product);
        console.log('productInfo ---> ', productInfo);
        resolve(product);
        return product;
      })
      .catch(error => {
        console.log('error', error);
        return [];
      });
  })
};

//fetch(productVariantId);

module.exports = fetch;
