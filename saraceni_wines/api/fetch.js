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
        console.log('product', JSON.stringify(product));
        console.log('product', product);
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
// fetch('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMjY3NDkwMzk0OTM5Mw==');
// fetch('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMjY3NDkwMzk0OTM5Mw=='); // variantsId Sparkling wine, 6x750ml, 7.0% abv
// fetch('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMjY3NDkwMzk0OTM5Mw==');
// fetch('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ3MDQ1MDg0Nzc1MjE=');

module.exports = fetch;

// product {
//   "__typename": "Product",
//   "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ3MDQ1MDc4ODc2OTc=",
//   "availableForSale": true,
//   "createdAt": "2020-10-02T14:23:48Z",
//   "updatedAt": "2020-10-02T14:44:34Z",
//   "descriptionHtml": "<meta charset=\"utf-8\">\n<p><span>'Hello, Summer' pack - 6 fantastic and innovative sparkling creations, 6 elegant and distinctive bottles, a</span> very special set of the world-famous and acclaimed Saraceni™ Iconic Bubbles.</p>\n<meta charset=\"utf-8\">\n<p><span>Size | 6x 750ml</span></p>\n<p><span>It contains:</span></p>\n<p><span>1x <strong>Blumond</strong> | Bubbly, sweet, unique blue color, peachy taste</span></p>\n<p><span>1x <strong>Splendia Fragolino</strong> | Bubbly, sweet, wild strawberry taste</span></p>\n<p><span>1x <strong>Volare</strong> | Bubbly, medium-sweet, Pinot grigio &amp; pink grapefruit</span></p>\n<p><span>1x <strong>Mario Sparkling Lemoncello</strong> | </span>Bubbly, medium-sweet, Lemoncello taste</p>\n<p><span>1x <strong>Hugo</strong> | Bubbly, </span><span>slightly sweet, refreshing, </span>flavored with refreshing elderflower</p>\n<p>1x <strong>Amor diVino</strong> | Bubbly, sweet pink moscato, irresistible taste</p>",
//   "description": "'Hello, Summer' pack - 6 fantastic and innovative sparkling creations, 6 elegant and distinctive bottles, a very special set of the world-famous and acclaimed Saraceni™ Iconic Bubbles. Size | 6x 750ml It contains: 1x Blumond | Bubbly, sweet, unique blue color, peachy taste 1x Splendia Fragolino | Bubbly, sweet, wild strawberry taste 1x Volare | Bubbly, medium-sweet, Pinot grigio & pink grapefruit 1x Mario Sparkling Lemoncello | Bubbly, medium-sweet, Lemoncello taste 1x Hugo | Bubbly, slightly sweet, refreshing, flavored with refreshing elderflower 1x Amor diVino | Bubbly, sweet pink moscato, irresistible taste",
//   "handle": "hello-summer-6-pack",
//   "productType": "Sparkling wine, 6x750ml, 7.0% abv",
//   "title": "Hello, Summer! 6-pack",
//   "vendor": "Saraceni Wines",
//   "publishedAt": "2020-10-02T14:28:14Z",
//   "onlineStoreUrl": null,
//   "options": [{
//     "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0T3B0aW9uLzYwOTg0ODI3MjQ5NDU=",
//     "name": "Title",
//     "values": [{
//       "value": "Default Title",
//       "type": {
//         "name": "String",
//         "kind": "SCALAR"
//       }
//     }],
//     "type": {
//       "name": "ProductOption",
//       "kind": "OBJECT",
//       "fieldBaseTypes": {
//         "name": "String",
//         "values": "String"
//       },
//       "implementsNode": true
//     }
//   }],
//   "images": [{
//     "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMTU4MzYwMDU0OTg5NjE=",
//     "src": "https://cdn.shopify.com/s/files/1/0101/2416/5201/products/62.jpg?v=1601648629",
//     "altText": "Hello, Summer! 6-pack Sparkling wine, 6x750ml, 7.0% abv Saraceni Wines ",
//     "type": {
//       "name": "Image",
//       "kind": "OBJECT",
//       "fieldBaseTypes": {
//         "altText": "String",
//         "id": "ID",
//         "originalSrc": "URL",
//         "src": "URL"
//       },
//       "implementsNode": false
//     },
//     "hasNextPage": {
//       "value": true
//     },
//     "hasPreviousPage": false,
//     "variableValues": {
//       "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ3MDQ1MDc4ODc2OTc="
//     }
//   }, {
//     "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMTU4MzYxMzQ4MDE0ODk=",
//     "src": "https://cdn.shopify.com/s/files/1/0101/2416/5201/products/35.jpg?v=1601649874",
//     "altText": null,
//     "type": {
//       "name": "Image",
//       "kind": "OBJECT",
//       "fieldBaseTypes": {
//         "altText": "String",
//         "id": "ID",
//         "originalSrc": "URL",
//         "src": "URL"
//       },
//       "implementsNode": false
//     },
//     "hasNextPage": false,
//     "hasPreviousPage": {
//       "value": true
//     },
//     "variableValues": {
//       "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ3MDQ1MDc4ODc2OTc="
//     }
//   }],
//   "variants": [{
//     "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMjY3NDkwMzk0OTM5Mw==",
//     "title": "Default Title",
//     "price": "131.94",
//     "priceV2": {
//       "amount": "131.94",
//       "currencyCode": "EUR",
//       "type": {
//         "name": "MoneyV2",
//         "kind": "OBJECT",
//         "fieldBaseTypes": {
//           "amount": "Decimal",
//           "currencyCode": "CurrencyCode"
//         },
//         "implementsNode": false
//       }
//     },
//     "presentmentPrices": [{
//       "price": {
//         "amount": "131.94",
//         "currencyCode": "EUR",
//         "type": {
//           "name": "MoneyV2",
//           "kind": "OBJECT",
//           "fieldBaseTypes": {
//             "amount": "Decimal",
//             "currencyCode": "CurrencyCode"
//           },
//           "implementsNode": false
//         }
//       },
//       "compareAtPrice": null,
//       "type": {
//         "name": "ProductVariantPricePair",
//         "kind": "OBJECT",
//         "fieldBaseTypes": {
//           "compareAtPrice": "MoneyV2",
//           "price": "MoneyV2"
//         },
//         "implementsNode": false
//       },
//       "hasNextPage": false,
//       "hasPreviousPage": false,
//       "variableValues": {
//         "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ3MDQ1MDc4ODc2OTc="
//       }
//     }],
//     "weight": 6,
//     "available": true,
//     "sku": "99000041x0614000000NV",
//     "compareAtPrice": null,
//     "compareAtPriceV2": null,
//     "image": {
//       "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMTU4MzYwMDU0OTg5NjE=",
//       "src": "https://cdn.shopify.com/s/files/1/0101/2416/5201/products/62.jpg?v=1601648629",
//       "altText": "Hello, Summer! 6-pack Sparkling wine, 6x750ml, 7.0% abv Saraceni Wines ",
//       "type": {
//         "name": "Image",
//         "kind": "OBJECT",
//         "fieldBaseTypes": {
//           "altText": "String",
//           "id": "ID",
//           "originalSrc": "URL",
//           "src": "URL"
//         },
//         "implementsNode": false
//       }
//     },
//     "selectedOptions": [{
//       "name": "Title",
//       "value": "Default Title",
//       "type": {
//         "name": "SelectedOption",
//         "kind": "OBJECT",
//         "fieldBaseTypes": {
//           "name": "String",
//           "value": "String"
//         },
//         "implementsNode": false
//       }
//     }],
//     "unitPrice": null,
//     "unitPriceMeasurement": {
//       "measuredType": null,
//       "quantityUnit": null,
//       "quantityValue": 0,
//       "referenceUnit": null,
//       "referenceValue": 0,
//       "type": {
//         "name": "UnitPriceMeasurement",
//         "kind": "OBJECT",
//         "fieldBaseTypes": {
//           "measuredType": "UnitPriceMeasurementMeasuredType",
//           "quantityUnit": "UnitPriceMeasurementMeasuredUnit",
//           "quantityValue": "Float",
//           "referenceUnit": "UnitPriceMeasurementMeasuredUnit",
//           "referenceValue": "Int"
//         },
//         "implementsNode": false
//       }
//     },
//     "type": {
//       "name": "ProductVariant",
//       "kind": "OBJECT",
//       "fieldBaseTypes": {
//         "availableForSale": "Boolean",
//         "compareAtPrice": "Money",
//         "compareAtPriceV2": "MoneyV2",
//         "id": "ID",
//         "image": "Image",
//         "presentmentPrices": "ProductVariantPricePairConnection",
//         "price": "Money",
//         "priceV2": "MoneyV2",
//         "product": "Product",
//         "selectedOptions": "SelectedOption",
//         "sku": "String",
//         "title": "String",
//         "unitPrice": "MoneyV2",
//         "unitPriceMeasurement": "UnitPriceMeasurement",
//         "weight": "Float"
//       },
//       "implementsNode": true
//     },
//     "hasNextPage": false,
//     "hasPreviousPage": false,
//     "variableValues": {
//       "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ3MDQ1MDc4ODc2OTc="
//     }
//   }],
//   "type": {
//     "name": "Product",
//     "kind": "OBJECT",
//     "fieldBaseTypes": {
//       "availableForSale": "Boolean",
//       "createdAt": "DateTime",
//       "description": "String",
//       "descriptionHtml": "HTML",
//       "handle": "String",
//       "id": "ID",
//       "images": "ImageConnection",
//       "onlineStoreUrl": "URL",
//       "options": "ProductOption",
//       "productType": "String",
//       "publishedAt": "DateTime",
//       "title": "String",
//       "updatedAt": "DateTime",
//       "variants": "ProductVariantConnection",
//       "vendor": "String"
//     },
//     "implementsNode": true
//   }
// }
// product name-- - > Hello, Summer!6 - pack