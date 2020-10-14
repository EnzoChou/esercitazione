// import Client from 'shopify-buy';
global.fetch = require('node-fetch');
var Client = require('shopify-buy');
var config = require('../config/config');

// Initializing a client to return content in the store's primary language
const client = Client.buildClient(config.dev2);

// console.log("client", client);

var checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9hZDczZTZhMWMyNDEzZTRkM2U0ZDNmZjY1MDJjMzI2NT9rZXk9YWQ1ZGRhNjU2ODdjOTk3NTA0MDFhYzRiNDJhOWMzNGI=';
var productId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ3MDQ1MDgwODQzMDU=';
var productVariantId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMjY3NDkwOTQyMTY0OQ==';
var productInfo;

var fetch = function (productId) {
  return new Promise((resolve, reject) => {
    client.product.fetch(productId)
      .then((product) => {
        // Do something with the product

        var vino = {};
        vino.id = product.id;
        vino.description = product.description;
        vino.descriptionHtml = product.descriptionHtml;
        vino.title = product.title;

        productInfo = product.id;
        console.log('product name ---> ', product.title);
        console.log('product.type ---> ', product.type);
        console.log('product.productType  ---> ', product.productType);
        console.log('product ---> ', product);
        console.log('productInfo ---> ', productInfo);
        if (product.variants) {
          console.log('product variants[0].id', product.variants[0].id);
        } else {
          //console.log('product image', product.images[product.images.length - 1].src);
        }

        resolve(product);
      })
      .catch(error => {
        console.log('error', error);
        return [];
      });
  })
};

// fetch(productVariantId);
// fetch('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ3MDQ1MDc4ODc2OTc='); // id Sparkling wine, 6x750ml, 7.0% abv
// fetch('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMjY3NDkwMzk0OTM5Mw=='); // variantsId Sparkling wine, 6x750ml, 7.0% abv
// fetch('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMjY3NDkwMzk0OTM5Mw==');
// fetch('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ3MDQ1MDg0Nzc1MjE=');

module.exports = fetch;
