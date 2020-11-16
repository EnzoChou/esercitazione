// import Client from 'shopify-buy';
global.fetch = require('node-fetch');
var Client = require('shopify-buy');
var config = require('../config/config');

// Initializing a client to return content in the store's primary language
const client = Client.buildClient(config.prod_EU);

// console.log("client", client);

var checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9hZDczZTZhMWMyNDEzZTRkM2U0ZDNmZjY1MDJjMzI2NT9rZXk9YWQ1ZGRhNjU2ODdjOTk3NTA0MDFhYzRiNDJhOWMzNGI=';
var productId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU3NzA5ODUwNDYxODI=';
var productVariantId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNjQwMzUzNzk2OTMxOA==';
var productInfo;

var fetchAllWithProducts = function () {
    return new Promise((resolve, reject) => {
        // Fetch all collections, including their products
        client.collection.fetchAllWithProducts().then((collections) => {
            // Do something with the collections
            // console.log(collections);
            // console.log(collections[0].products);
            resolve(collections);
        })
            .catch(err => {
                console.log('err in fetchAllWithProducts', err);
                resolve(err);
            });
    })
};

fetchAllWithProducts().then(collections => {
    collections.map(collection => {
        console.log('nome collection', collection.title);
        console.log('id collezione', collection.id);
    })
    console.log(collections.map(collection => collection.id));
    console.log('lunghezza collezioni', collections.length);
})


