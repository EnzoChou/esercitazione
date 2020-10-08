// import Client from 'shopify-buy';
global.fetch = require('node-fetch');
var Client = require('shopify-buy');

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
  domain: 'test-hej.myshopify.com',
  storefrontAccessToken: 'ab5232770d3011658fd90b0cf536a8c0'
});;

// console.log("client", client);

var checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9hZDczZTZhMWMyNDEzZTRkM2U0ZDNmZjY1MDJjMzI2NT9rZXk9YWQ1ZGRhNjU2ODdjOTk3NTA0MDFhYzRiNDJhOWMzNGI=';
var productId;
var productVariantId;
var productInfo;

/*
product.id Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU3MzMxMjk0NTM3MzQ=
product.title Vino 1
product.id Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU3NzA5ODUwNDYxODI=
product.title Hugo
product.id Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU3NzUzMjc5MjAyOTQ=
product.title Perlè
product.id Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU3NzUzMzAxMTU3NTA=
product.title Libero Chianti
*/


// Fetch all products in your shop
var fetchAll = function () {
  return client.product.fetchAll()
    .then((products) => {
      // Do something with the products
      productId = products[0].id;
      productVariantId = products[0].variants[0].id;
      console.log('number of products ---> ', products.length);
      console.log('products[0] ---> ', products[0]);
      console.log('products[0].title --->', products[0].title);
      console.log('products[0].variants[0] --->', products[0].variants[0]);
      console.log('products[0].variants[0].id ---> ', products[0].variants[0].id);
      console.log('productId ---> ', productId);
      products.forEach(product => {
        console.log('single product ---> ', product,
          '\nproduct.variants.length', product.variants.length,
          '\nproduct.variants[0].id', product.variants[0].id,
          '\nproduct.images', product.variants[0].image.src,
          '\nproduct.id', product.id,
          '\nproduct.title', product.title,
          '\nproduct.description', product.description
        );
      })
      return products;
    })
    .catch(error =>
      console.log('error', error)
    )
}

// fetchAll(); 

module.exports = fetchAll;