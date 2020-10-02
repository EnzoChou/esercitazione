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
var productId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU3NzA5ODUwNDYxODI=';
var productVariantId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNjQwMzUzNzk2OTMxOA==';
var productInfo;

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
        return checkout;
      })
      .catch(error => {
        console.log('error', error);
        reject(error);
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
        return checkout;
      })
      .catch(err => {
        console.log('errore in checkout fetch', err);
        reject(err);
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
          if(product.variants) {
            console.log('\n\nquesto è un product ID\n\n');
          } else {
            console.log('\n\nquesto è un product variants ID\n\n')
          }
          if(product.image) {
            console.log('immagine url', product.image);
          }
          resolve(product);
        } else {
          resolve();
        };
      })
      .catch(error => {
        console.log('errorij ojaofjdsofjapohfeahpo', error);
        reject(error);
      });
  })
};

//fetchById(productVariantId);

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
        return checkout;
      })
      .catch(error => {
        console.log('errore nella addLineItems', error);
        reject(error);
      });
  })
};

// Update the line item on the checkout (change the quantity or variant)
var updateLineItems = function (checkoutId, lineItemsToUpdate) {
  return new Promise((resolve, reject) => {
    return client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then((checkout) => {
      // Do something with the updated checkout
      console.log('id we need to remember to update this particular lineitem');
      console.log('checkout.lineItems[0].id ---> ', checkout.lineItems[0].id);// Array with one additional line item
      resolve(checkout);
    })
      .catch(error =>
        console.log('error ---> ', error)
      )
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
        reject(err);
      })
  });
};

// removeLineItems(checkoutId, 'Z2lkOi8vc2hvcGlmeS9DaGVja291dExpbmVJdGVtLzM2MjYyMDUyNTkzODMwMD9jaGVja291dD1hZDczZTZhMWMyNDEzZTRkM2U0ZDNmZjY1MDJjMzI2NQ==');

var shopify = {};

shopify.createCheckout = createCheckout;
shopify.checkoutFetch = checkoutFetch;
shopify.fetchById = fetchById;
shopify.fetchAll = fetchAll;
shopify.addLineItems = addLineItems;
shopify.updateLineItems = updateLineItems;
shopify.removeLineItems = removeLineItems;

module.exports = shopify;
