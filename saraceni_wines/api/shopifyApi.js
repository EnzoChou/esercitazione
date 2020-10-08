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
const collectionId = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzkzNzk5MTIwOTc3';

// Create an empty checkout
var createCheckout = function () {
  return new Promise((resolve, reject) => {
    client.checkout.create()
      .then((checkout) => {
        // Do something with the checkout
        checkoutId = checkout.id;
        console.log('checkout.webUrl ---> ', checkout.webUrl);
        console.log('checkoutId ---> ', checkoutId);
        resolve(checkout);
      })
      .catch(error => {
        console.log('error', error);
        resolve();
      });
  });
};

// createCheckout();

var checkoutFetch = function (checkoutId) {
  return new Promise((resolve, reject) => {
    return client.checkout.fetch(checkoutId)
      .then(checkout => {
        // Do something with the checkout
        console.log('checkout ---> ', checkout);
        console.log('checkout.id ---> ', checkout.id);
        // console.log('checkout.lineItems[0].id ---> ', checkout.lineItems[0].id);
        // console.log('checkout.lineItems[0].quantity ---> ', checkout.lineItems[0].quantity);
        console.log('checkout.lineItems.length --->', checkout.lineItems.length);
        if (checkout.lineItems.length > 0) {
          checkout.lineItems.forEach(elem => {
            console.log('\n\ntitolo', elem.title);
            console.log('\n\nquantity', elem.quantity);
            console.log('\n\nlineItem id', elem.id);
          })
        }
        console.log('checkout.order --->', checkout.order);
        resolve(checkout);
      })
      .catch(err => {
        console.log('errore in checkout fetch', err);
        resolve();
      });
  })
};

// checkoutFetch(checkoutId);

// Fetch a single product by ID
var fetchById = function (productId) {
  return new Promise((resolve, reject) => {
    client.product.fetch(productId)
      .then((product) => {
        if (product) {
          // Do something with the product
          productInfo = product.id;
          console.log('product.type ---> ', product.type);
          console.log('product ---> ', product);
          console.log('productInfo ---> ', productInfo);
          if (product.variants) {
            console.log('\n\nquesto è un product ID\n\n');
          } else {
            console.log('\n\nquesto è un product variants ID\n\n');
          }
          if (product.image) {
            console.log('immagine url', product.image);
          }
          resolve(product);
        } else {
          resolve();
        };
      })
      .catch(error => {
        console.log('errorij ojaofjdsofjapohfeahpo', error);
        resolve();
      });
  })
};

//fetchById(productVariantId);

// Fetch all products in your shop
var fetchAll = function () {
  return new Promise((resolve, reject) => {
    return client.product.fetchAll(250)
      .then((products) => {
        /*if (products) {
          console.log('vini trovati su shopify', products.length);
          products.forEach(product => {
            console.log('nome vino:', product.title);
          })
        }*/
        // Do something with the products
        // productId = products[0].id;
        // productVariantId = products[0].variants[0].id;
        // console.log('number of products ---> ', products.length);
        // console.log('products[0] ---> ', products[0]);
        // console.log('products[0].title --->', products[0].title);
        // console.log('products[0].variants[0] --->', products[0].variants[0]);
        // console.log('products[0].variants[0].id ---> ', products[0].variants[0].id);
        // console.log('productId ---> ', productId);
        /*products.forEach(product => {
          console.log('single product ---> ', product,
            '\nproduct.variants.length', product.variants.length,
            '\nproduct.variants[0].id', product.variants[0].id,
            '\nproduct.images', product.variants[0].image.src,
            '\nproduct.id', product.id,
            '\nproduct.title', product.title,
            '\nproduct.description', product.description
          );
        })*/
        resolve(products);
      })
      .catch(error => {
        console.log('error', error);
        resolve();
      })
  })
}

// fetchAll().then(vini => { console.log(vini) });

// Add an item to the checkout
var addLineItems = function (checkoutId, lineItemsToAdd) {
  return new Promise((resolve, reject) => {
    return client.checkout.addLineItems(checkoutId, lineItemsToAdd)
      .then((checkout) => {
        // Do something with the updated checkout
        // console.log('checkout.id  ---> ', checkout.id); // Array with one additional line item
        // console.log('checkout.lineItems 1  ---> ', checkout.lineItems); // Array with one additional line item
        // console.log('checkout.lineItems[0].quantity  ---> ', checkout.lineItems[0].quantity); // Array with one additional line item
        // console.log('checkout function ---> ', checkout);
        console.log('checkout successo');
        resolve(checkout);
      })
      .catch(error => {
        console.log('errore nella addLineItems', error);
        resolve();
      });
  })
};

// Update the line item on the checkout (change the quantity or variant)
var updateLineItems = function (checkoutId, lineItemsToUpdate) {
  return new Promise((resolve, reject) => {
    return client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then((checkout) => {
      // Do something with the updated checkout
      console.log('id we need to remember to update this particular lineitem');
      console.log('checkout.lineItems[0].id ---> ', checkout.lineItems[0].id); // Array with one additional line item
      resolve(checkout);
    })
      .catch(error => {
        console.log('error ---> ', error);
        resolve();
      })
  })
}

// addLineItems(checkoutId, lineItemsToAdd);

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
        resolve();
      })
  });
};

// removeLineItems(checkoutId, 'Z2lkOi8vc2hvcGlmeS9DaGVja291dExpbmVJdGVtLzM2MjYyMDUyNTkzODMwMD9jaGVja291dD1hZDczZTZhMWMyNDEzZTRkM2U0ZDNmZjY1MDJjMzI2NQ==');

var fetchAllCollections = function () {
  return new Promise((resolve, reject) => {
    // Fetch all collections, including their products
    client.collection.fetchAllWithProducts().then((collections) => {
      // Do something with the collections
      console.log(collections);
      console.log(collections[0].products);
      resolve(collections);
    })
    .catch(err => {
      console.log('err in fetchAllWithProducts', err);
      resolve(err);
    });
  })
};

var fetchCollectionById = function (collectionId) {
  return new Promise((resolve, reject) => {
    
    // Fetch a single collection by ID, including its products
    // Set a parameter for first x products, defaults to 20 if you don't provide a param

    client.collection.fetchWithProducts(collectionId, { productsFirst: 20 }).then((collection) => {
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

var shopify = {};

shopify.createCheckout = createCheckout;
shopify.checkoutFetch = checkoutFetch;
shopify.fetchById = fetchById;
shopify.fetchAll = fetchAll;
shopify.addLineItems = addLineItems;
shopify.updateLineItems = updateLineItems;
shopify.removeLineItems = removeLineItems;
shopify.fetchAllCollections = fetchAllCollections;
shopify.fetchCollectionById = fetchCollectionById;

module.exports = shopify;