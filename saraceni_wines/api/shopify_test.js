// import Client from 'shopify-buy';
global.fetch = require('node-fetch');
var Client = require('shopify-buy');

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
  domain: 'test-hej.myshopify.com',
  storefrontAccessToken: 'ab5232770d3011658fd90b0cf536a8c0'
});

// console.log("client", client);

var checkoutId;
var productId;
var productVariantId;
var productInfo;

return client.checkout.create()
  .then((checkout) => {
    // Do something with the checkout
    checkoutId = checkout.id;
    console.log('checkout.webUrl ---> ', checkout.webUrl);
    console.log('checkoutId ---> ', checkoutId);
    return;
  })
  .then(res => {
    // Fetch all products in your shop
    return client.product.fetchAll()
      .then((products) => {
        // Do something with the products
        productId = products[0].id;
        productVariantId = products[0].variants[0].id;
        console.log('products[0] ---> ', products[0]);
        console.log('products[0].variants[0].id ---> ', products[0].variants[0].id);
        console.log('productId ---> ', productId);
        console.log('productId.quantity ---> ', productId.quantity);
        return;
      }).then(res => {
        return client.product.fetch(productId).then((product) => {
          // Do something with the product
          productInfo = product.id
          console.log('productInfo ---> ', productInfo);
          return;
        })
          .then(res => {
            const lineItemsToAdd = [{
              variantId: productVariantId,
              quantity: 5,
              customAttributes: [{
                key: 'MyKey',
                value: 'MyValue'
              }]
            }];

            // Add an item to the checkout
            return client.checkout.addLineItems(checkoutId, lineItemsToAdd).then((checkout) => {
              // Do something with the updated checkout
              console.log('checkout.lineItems 1  ---> ', checkout.lineItems); // Array with one additional line item
              return;
            })
              .then(res => {
                const lineItemsToUpdate = [{
                  id: productId,
                  quantity: 2
                }];

                // Update the line item on the checkout (change the quantity or variant)
                return client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then((checkout) => {
                  // Do something with the updated checkout
                  console.log('checkout.lineItems ---> ', checkout.lineItems); // Array with one additional line item
                  return;

                })
                  .then(res => {

                    return client.checkout.fetch(checkoutId).then((checkout) => {
                      // Do something with the checkout
                      console.log('final checkout ---> ', checkout);
                      return;
                    });
                  });
              });
          });
      });

  })
  .catch(err => {
    console.log('err ---> ', err);
    return;
  });