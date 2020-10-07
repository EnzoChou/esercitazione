// import Client from 'shopify-buy';
global.fetch = require('node-fetch');
var Client = require('shopify-buy');
var config = require('../config/config');

// Initializing a client to return content in the store's primary language
const client = Client.buildClient(config.dev2);

// console.log("client", client);

var checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9hZDczZTZhMWMyNDEzZTRkM2U0ZDNmZjY1MDJjMzI2NT9rZXk9YWQ1ZGRhNjU2ODdjOTk3NTA0MDFhYzRiNDJhOWMzNGI=';
var productId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU3NzA5ODUwNDYxODI=';
var productVariantId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNjQwMzUzNzk2OTMxOA==';
var productInfo;

var fetchWithProducts = function () {
    return new Promise((resolve, reject) => {
      
      // Fetch a single collection by ID, including its products
      const collectionId = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzkzNzk5MTIwOTc3';
      // Set a parameter for first x products, defaults to 20 if you don't provide a param
  
      client.collection.fetchWithProducts(collectionId, { productsFirst: 10 }).then((collection) => {
        // Do something with the collection
        console.log(collection);
        console.log(collection.products);
        resolve(collection);
      })
      .catch(err => {
        console.log('err in fetchWithProducts', err);
        resolve(err);
      });
    })
  };
/*
  fetchWithProducts().then(collection => {
    console.log(collection);
    console.log('title collezione', collection.title);
})

*/