// prova
const config = require('../config/config').dev_v2;
const axios = require('axios').default;
const queryString = require('query-string');
// axios.create()
axios.defaults.baseURL = config.host;
axios.defaults.auth = {
    username: config.username,
    password: config.password
};

console.log(axios.defaults.username+':'+axios.defaults.password+axios.defaults.baseURL);

// FETCH BY ID and ALL altogether
var getProducts = function (id = 0, params = {}) {
    if (id == 0) {
        // "retrieve all products"
        axios.get('/admin/api/2020-10/products.json', queryString.stringify(params))
            .then(res => {
                console.log('ecco a te i risultati', res.data);
                return res.data;
            })
            .catch(err => {
                console.log('errore in retrieve all products', err);
                return;
            })
    } else {
        // "retrieve by id"
        axios.get(`/admin/api/2020-10/products/${id}.json`, queryString.stringify(params))
            .then(res => {
                console.log('ecco a te il prodotto', res.data.product);
                return res.data;
            })
            .catch(err => {
                console.log('errore nel retrieve di un singolo prodotto', err);
                return;
            })
    }
};
// 
getProducts(4704507461713);

var createCheckout = function (checkout_id = "", params = { "checkout": { "line_items": [] } }) {
    axios.get('/cart/Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMjY3NDkxMTAyNzI4MQ==:1')
        .then(res => {
            console.log('checkout creato ---> ', res);
            return res.checkout;
        })
        .catch(err => {
            console.log('errore nel creare checkout --->', err);
            return;
        })
}

// createCheckout();

var fetchAll = function (params = {}) {
    axios.get('/admin/api/2020-10/products.json', queryString.stringify(params))
        .then(res => {
            console.log('ecco a te i risultati', res.data);
            return res.data;
        })
        .catch(err => {
            console.log('errore in retrieve all products', err);
            return;
        })
};

var fetchById = function (productId, params = {}) {
    axios.get(`/admin/api/2020-10/products/${productId}.json`, queryString.stringify(params))
        .then(res => {
            console.log('ecco a te il prodotto', res.data.product);
            return res.data;
        })
        .catch(err => {
            console.log('errore nel retrieve di un singolo prodotto', err);
            return;
        })
};

var checkoutFetch = function (checkoutId, params = {}) {
    axios.get(`/admin/api/2020-10/checkouts/${checkoutId}.json`, queryString.stringify(params))
    .then(res => {
        console.log('questo è il carrello ---> ', res.checkout);
        return res.checkout;
    })
};

// checkoutFetch('Z2lkOi8vc2hvcGlmeS9DaGVja291dC83ZWQ0YTA3YmM1YzQ2ZTI2NGQ5ZDI0ZTZhZTQyNDJjOD9rZXk9MmJhZWRkMjMyNThiMDNiZTkwOTMzOWZhMWJmMTA4MTI=');

var addLineItems = function (checkoutId, lineItemsToAdd) {

};

var updateLineItems = function (checkoutId, lineItemsToUpdate) {
};

var removeLineItems = function (checkoutId, lineItemIdsToRemove) {

};

var fetchAllCollections = function () {

};

var fetchCollectionById = function (collectionId) {

};

var shopify = {};

// shopify.createCheckout = createCheckout;
shopify.checkoutFetch = checkoutFetch;
shopify.getProducts = getProducts;
shopify.fetchById = fetchById;
shopify.fetchAll = fetchAll;
shopify.addLineItems = addLineItems;
shopify.updateLineItems = updateLineItems;
shopify.removeLineItems = removeLineItems;
shopify.fetchAllCollections = fetchAllCollections;
shopify.fetchCollectionById = fetchCollectionById;

module.exports = shopify;


var prodotti = {
    "id": 4704508018769,
    "title": "Amor diVino",
    "body_html": "<div class=\"shogun-root\" data-shogun-id=\"5d7ec4171e1a9e0055204fd2\" data-shogun-site-id=\"0e2aea29-e27f-4674-b289-3fbd37b4f687\" data-shogun-page-id=\"5d7ec4171e1a9e0055204fd2\" data-shogun-page-version-id=\"5d7ec4171e1a9e0055204fd1\" data-shogun-platform-type=\"shopify\" data-shogun-variant-id=\"5d7ec4171e1a9e0055204fd5\" data-region=\"main\">\n<div id=\"s-a27e01fe-64d3-4a28-a725-49675146d705\" class=\"shg-c\">\n<meta charset=\"utf-8\">\n<div id=\"s-a27e01fe-64d3-4a28-a725-49675146d705\" class=\"shg-c\">\n<h4><span><strong>!<span style=\"text-decoration: underline;\">NEW</span>! \"Pink Moscato at its best\"</strong></span></h4>\n</div>\n<div class=\"shg-c\">\n<meta charset=\"utf-8\">\n<p><span>Amor diVino is the latest edition to our iconic sparkling collection. </span>Its fashionable pink color is simply irresistible, its fine bubbles will dance on your palate, the taste is a delicate balance of roses, summer peach, apricot, and wildflower, with hints of honey.<br></p>\n<p>One taste of this crisp, refreshing Wine and you’ll want to sparkle with it until the end of time. Perfect to share with a few loved ones over dinner - or to treat yourself after a long week.</p>\n<div class=\"entry-content\">\n<p>Amor diVino is the ideal drink: fresh, thirst-quenching and unexpectedly sweet. Capable of overthrowing a bad day with fun sparkling time! And yes, it will be the next must-have for summer parties!</p>\n</div>\n<h5 class=\"heading\">☆ SEDUCTIVE, VELVETY &amp; LIGHT</h5>\n<h5 class=\"heading\">☆ FLOWERY &amp; FRUITY</h5>\n<h5 class=\"heading\">☆ MADE IN ITALY</h5>\n<h5 class=\"heading\">☆ ELEGANT &amp; DISTINCTIVE WHITE BOTTLE</h5>\n<p><br></p>\nProduct of Italy</div>\n<div class=\"shg-c\">\n<div id=\"s-a27e01fe-64d3-4a28-a725-49675146d705\">Type | Bubbly</div>\n<div>Sweetness | Sweet</div>\n<div>Varieties | Moscato, Glera</div>\n<div>Color | Pink</div>\n<div>Size | 750ml</div>\n<div>Closure | Natural cork</div>\nSERVING TEMP.  | 4-6°C (37-40°F) - Chilled<br>ALC. CONTENT  | 8%</div>\n<div class=\"shg-c\">SERVING SUGGESTION |<meta charset=\"utf-8\"> <span>A unique and festive sparkling wine and a seductive aperitif. Pairs well with seafood, cheeses, spicy fare, and chocolate. Serve chilled.</span>\n</div>\n</div>\n</div>",
    "vendor": "Saraceni Wines",
    "product_type": "Sparkling wine, 750ml, 7.0% abv",
    "created_at": "2020-10-02T16:23:56+02:00",
    "handle": "amor-divino-750",
    "updated_at": "2020-10-02T16:32:21+02:00",
    "published_at": "2020-10-02T16:23:49+02:00",
    "template_suffix": null,
    "status": "active",
    "published_scope": "web",
    "tags": "Best sellers, Bubbly Sweet, New",
    "admin_graphql_api_id": "gid://shopify/Product/4704508018769",
    "variants": [
        {
            "id": 32674904178769,
            "product_id": 4704508018769,
            "title": "Default Title",
            "price": "21.99",
            "sku": "01000827x0114000750NV",
            "position": 1,
            "inventory_policy": "deny",
            "compare_at_price": null,
            "fulfillment_service": "manual",
            "inventory_management": "shopify",
            "option1": "Default Title",
            "option2": null,
            "option3": null,
            "created_at": "2020-10-02T16:23:56+02:00",
            "updated_at": "2020-10-02T16:23:56+02:00",
            "taxable": true,
            "barcode": "",
            "grams": 1000,
            "image_id": null,
            "weight": 1.0,
            "weight_unit": "kg",
            "inventory_item_id": 34265520373841,
            "inventory_quantity": 1165,
            "old_inventory_quantity": 1165,
            "requires_shipping": true,
            "admin_graphql_api_id": "gid://shopify/ProductVariant/32674904178769"
        }
    ],
    "options": [
        {
            "id": 6098482921553,
            "product_id": 4704508018769,
            "name": "Title",
            "position": 1,
            "values": [
                "Default Title"
            ]
        }
    ],
    "images": [
        {
            "id": 15836006514769,
            "product_id": 4704508018769,
            "position": 1,
            "created_at": "2020-10-02T16:23:56+02:00",
            "updated_at": "2020-10-02T16:23:56+02:00",
            "alt": "Amor diVino Sparkling wine, 750ml, 7.0% abv Saraceni Wines ",
            "width": 1080,
            "height": 1080,
            "src": "https://cdn.shopify.com/s/files/1/0101/2416/5201/products/13_5c286235-1c99-444b-87a9-c013e7806e51.png?v=1601648636",
            "variant_ids": [],
            "admin_graphql_api_id": "gid://shopify/ProductImage/15836006514769"
        },
        {
            "id": 15836006547537,
            "product_id": 4704508018769,
            "position": 2,
            "created_at": "2020-10-02T16:23:56+02:00",
            "updated_at": "2020-10-02T16:23:56+02:00",
            "alt": "Amor diVino Sparkling wine, 750ml, 7.0% abv Saraceni Wines ",
            "width": 1080,
            "height": 1080,
            "src": "https://cdn.shopify.com/s/files/1/0101/2416/5201/products/15_a5494190-dc18-40be-9b62-cf9c6cd457cb.png?v=1601648636",
            "variant_ids": [],
            "admin_graphql_api_id": "gid://shopify/ProductImage/15836006547537"
        },
        {
            "id": 15836006580305,
            "product_id": 4704508018769,
            "position": 3,
            "created_at": "2020-10-02T16:23:56+02:00",
            "updated_at": "2020-10-02T16:23:56+02:00",
            "alt": "Amor diVino Sparkling wine, 750ml, 7.0% abv Saraceni Wines ",
            "width": 1080,
            "height": 1080,
            "src": "https://cdn.shopify.com/s/files/1/0101/2416/5201/products/16_3e17358e-44b7-4c3a-954c-a0ea6a7f6309.png?v=1601648636",
            "variant_ids": [],
            "admin_graphql_api_id": "gid://shopify/ProductImage/15836006580305"
        },
        {
            "id": 15836054487121,
            "product_id": 4704508018769,
            "position": 4,
            "created_at": "2020-10-02T16:32:21+02:00",
            "updated_at": "2020-10-02T16:32:21+02:00",
            "alt": null,
            "width": 1200,
            "height": 628,
            "src": "https://cdn.shopify.com/s/files/1/0101/2416/5201/products/5.jpg?v=1601649141",
            "variant_ids": [],
            "admin_graphql_api_id": "gid://shopify/ProductImage/15836054487121"
        }
    ],
    "image": {
        "id": 15836006514769,
        "product_id": 4704508018769,
        "position": 1,
        "created_at": "2020-10-02T16:23:56+02:00",
        "updated_at": "2020-10-02T16:23:56+02:00",
        "alt": "Amor diVino Sparkling wine, 750ml, 7.0% abv Saraceni Wines ",
        "width": 1080,
        "height": 1080,
        "src": "https://cdn.shopify.com/s/files/1/0101/2416/5201/products/13_5c286235-1c99-444b-87a9-c013e7806e51.png?v=1601648636",
        "variant_ids": [],
        "admin_graphql_api_id": "gid://shopify/ProductImage/15836006514769"
    }
}

var baby_blumond = {
    "id": 4704509395025,
    "title": "Baby Blumond® Party Kit",
    "body_html": "<meta charset=\"utf-8\"><meta charset=\"utf-8\">\n<h4><span><strong>CELEBRATE IN STYLE WITH OUR PARTY KIT</strong></span></h4>\n<p><span>A stunning limited edition case of 6 baby bottle (375mL) of the world acclaimed Blumond, the Italian Blue Revolution!</span></p>\n<ul></ul>\n<p>The Party Kit includes:</p>\n<ul>\n<li>6 Baby Blumond (375mL)</li>\n<li>6 Saraceni Clear Acrylic Flutes</li>\n<li>1 Saraceni Ice Bucket in crystal clear Plexiglass</li>\n</ul>\n<ul></ul>\n<h4>The new must-have, Make your World Sparkle!</h4>\n<meta charset=\"utf-8\">\n<p><strong>Please note</strong> these are 375ml bottles, which are smaller than a regular 750ml bottle!</p>",
    "vendor": "Saraceni Wines",
    "product_type": "Sparkling wine, 6x375ml, 7.0% ABV",
    "created_at": "2020-10-02T16:25:17+02:00",
    "handle": "copy-of-baby-sparklers-party-kit",
    "updated_at": "2020-10-02T17:34:49+02:00",
    "published_at": "2020-10-02T16:25:15+02:00",
    "template_suffix": null,
    "status": "active",
    "published_scope": "web",
    "tags": "Gifts & mixed cases, Small bottles",
    "admin_graphql_api_id": "gid://shopify/Product/4704509395025",
    "variants": [
        {
            "id": 32674907422801,
            "product_id": 4704509395025,
            "title": "party kit for 6",
            "price": "125.00",
            "sku": "99000002x1305100000NV",
            "position": 1,
            "inventory_policy": "deny",
            "compare_at_price": "170.00",
            "fulfillment_service": "manual",
            "inventory_management": "shopify",
            "option1": "party kit for 6",
            "option2": null,
            "option3": null,
            "created_at": "2020-10-02T16:25:17+02:00",
            "updated_at": "2020-10-02T16:25:17+02:00",
            "taxable": true,
            "barcode": "8051827260308",
            "grams": 12000,
            "image_id": null,
            "weight": 12.0,
            "weight_unit": "kg",
            "inventory_item_id": 34265523617873,
            "inventory_quantity": 97,
            "old_inventory_quantity": 97,
            "requires_shipping": true,
            "admin_graphql_api_id": "gid://shopify/ProductVariant/32674907422801"
        }
    ],
    "options": [
        {
            "id": 6098484559953,
            "product_id": 4704509395025,
            "name": "Size",
            "position": 1,
            "values": [
                "party kit for 6"
            ]
        }
    ],
    "images": [
        {
            "id": 15836014542929,
            "product_id": 4704509395025,
            "position": 1,
            "created_at": "2020-10-02T16:25:17+02:00",
            "updated_at": "2020-10-02T16:25:17+02:00",
            "alt": "Baby Blumond® PARTY KIT Party Kit Saraceni Wines ",
            "width": 1080,
            "height": 1080,
            "src": "https://cdn.shopify.com/s/files/1/0101/2416/5201/products/Store_-_Pdt_images_12.png?v=1601648717",
            "variant_ids": [],
            "admin_graphql_api_id": "gid://shopify/ProductImage/15836014542929"
        },
        {
            "id": 15836436332625,
            "product_id": 4704509395025,
            "position": 2,
            "created_at": "2020-10-02T17:34:49+02:00",
            "updated_at": "2020-10-02T17:34:49+02:00",
            "alt": null,
            "width": 1200,
            "height": 628,
            "src": "https://cdn.shopify.com/s/files/1/0101/2416/5201/products/41_fef1ed54-2792-4a3b-8201-cab9bb7ed8a1.jpg?v=1601652889",
            "variant_ids": [],
            "admin_graphql_api_id": "gid://shopify/ProductImage/15836436332625"
        }
    ],
    "image": {
        "id": 15836014542929,
        "product_id": 4704509395025,
        "position": 1,
        "created_at": "2020-10-02T16:25:17+02:00",
        "updated_at": "2020-10-02T16:25:17+02:00",
        "alt": "Baby Blumond® PARTY KIT Party Kit Saraceni Wines ",
        "width": 1080,
        "height": 1080,
        "src": "https://cdn.shopify.com/s/files/1/0101/2416/5201/products/Store_-_Pdt_images_12.png?v=1601648717",
        "variant_ids": [],
        "admin_graphql_api_id": "gid://shopify/ProductImage/15836014542929"
    }
}

'<!doctype html>\n' +
    '\n' +
    '<html class="no-js" lang="en">\n' +
    '  <head>\n' +
    '    <meta charset="utf-8">\n' +
    '    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">\n' +
    '    <meta name="viewport" content="width=device-width, initial-scale=1.0, height=device-height, minimum-scale=1.0, user-scalable=0">\n' +
    '    <meta name="theme-color" content="">\n' +
    '\n' +
    '    <title>Test Saraceni Wines™</title><link rel="canonical" href="https://apac-saraceni-wines.myshopify.com/password"><link rel="shortcut icon" href="//cdn.shopify.com/s/files/1/0101/2416/5201/files/S_logo_32x32.png?v=1586037929" type="image/png"><meta property="og:type" content="website">\n' +
    '  <meta property="og:title" content=""><meta property="og:url" content="https://apac-saraceni-wines.myshopify.com/password">\n' +
    '<meta property="og:site_name" content="Test Saraceni Wines™"><meta name="twitter:card" content="summary"><meta name="twitter:title" content="">\n' +
    '  <meta name="twitter:description" content="">\n' +
    '\n' +
    `    <script>window.performance && window.performance.mark && window.performance.mark('shopify.content_for_header.start');</script><meta name="google-site-verification" content="-IsfGTn6siH2OY97BqgZhRHkBEcelj_QBlp5QD_8nnI">\n` +
    '<meta name="google-site-verification" content="cmysD1n48SULW4fDOL3_iTllX4PXccSJHJMhGkVVaFE">\n' +
    '<meta id="shopify-digital-wallet" name="shopify-digital-wallet" content="/10124165201/digital_wallets/dialog">\n' +
    '<meta name="shopify-checkout-api-token" content="4588ee72dee5ed7117a74c61ee965f72">\n' +
    '<meta id="in-context-paypal-metadata" data-shop-id="10124165201" data-venmo-supported="false" data-environment="production" data-locale="en_US" data-paypal-v4="true" data-currency="EUR">\n' +
    '<meta id="amazon-payments-metadata" data-amazon-payments="true" data-amazon-payments-seller-id="A19FSWI655ID02" data-amazon-payments-callback-url="https://apac-saraceni-wines.myshopify.com/10124165201/amazon_payments/callback" data-amazon-payments-sandbox-mode="false" data-amazon-payments-client-id="amzn1.application-oa2-client.29d26bc5d7ff4df1a6242986e517b277" data-amazon-payments-region="EU" data-amazon-payments-language="it-IT" data-amazon-payments-widget-library-url="https://static-eu.payments-amazon.com/OffAmazonPayments/de/lpa/js/Widgets.js">\n' +
    '<link href="https://monorail-edge.shopifysvc.com" rel="dns-prefetch">\n' +
    '<script>var Shopify = Shopify || {};\n' +
    'Shopify.shop = "apac-saraceni-wines.myshopify.com";\n' +
    'Shopify.locale = "en";\n' +
    'Shopify.currency = {"active":"EUR","rate":"1.0"};\n' +
    'Shopify.theme = {"name":"Copy of Prestige","id":47341666385,"theme_store_id":null,"role":"main"};\n' +
    'Shopify.theme.handle = "null";\n' +
    'Shopify.theme.style = {"id":null,"handle":null};\n' +
    'Shopify.cdnHost = "cdn.shopify.com";</script>\n' +
    '<script type="module">!function(o){(o.Shopify=o.Shopify||{}).modules=!0}(window);</script>\n' +
    '<script>!function(o){function n(){var o=[];function n(){o.push(Array.prototype.slice.apply(arguments))}return n.q=o,n}var t=o.Shopify=o.Shopify||{};t.loadFeatures=n(),t.autoloadFeatures=n()}(window);</script>\n' +
    '<script>window.ShopifyPay = window.ShopifyPay || {};\n' +
    'window.ShopifyPay.apiHost = "pay.shopify.com";</script>\n' +
    '<script id="__st">var __st={"a":10124165201,"offset":7200,"reqid":"5d29c3e3-b06f-49ea-a6b8-0bc724563937","pageurl":"apac-saraceni-wines.myshopify.com\\/password","u":"0aeca804c424","p":"password"};</script>\n' +
    '<script>window.ShopifyPaypalV4VisibilityTracking = true;</script>\n' +
    '<script>window.ShopifyAnalytics = window.ShopifyAnalytics || {};\n' +
    'window.ShopifyAnalytics.meta = window.ShopifyAnalytics.meta || {};\n' +
    "window.ShopifyAnalytics.meta.currency = 'EUR';\n" +
    'var meta = {"page":{"pageType":"password"}};\n' +
    'for (var attr in meta) {\n' +
    '  window.ShopifyAnalytics.meta[attr] = meta[attr];\n' +
    '}</script>\n' +
    '<script>window.ShopifyAnalytics.merchantGoogleAnalytics = function() {\n' +
    '  \n' +
    '};\n' +
    '</script>\n' +
    `<script class="analytics">(window.gaDevIds=window.gaDevIds||[]).push('BwiEti');\n` +
    '\n' +
    '\n' +
    '(function () {\n' +
    '  var customDocumentWrite = function(content) {\n' +
    '    var jquery = null;\n' +
    '\n' +
    '    if (window.jQuery) {\n' +
    '      jquery = window.jQuery;\n' +
    '    } else if (window.Checkout && window.Checkout.$) {\n' +
    '      jquery = window.Checkout.$;\n' +
    '    }\n' +
    '\n' +
    '    if (jquery) {\n' +
    "      jquery('body').append(content);\n" +
    '    }\n' +
    '  };\n' +
    '\n' +
    '  var isDuplicatedThankYouPageView = function() {\n' +
    "    return document.cookie.indexOf('loggedConversion=' + window.location.pathname) !== -1;\n" +
    '  }\n' +
    '\n' +
    '  var setCookieIfThankYouPage = function() {\n' +
    "    if (window.location.pathname.indexOf('/checkouts') !== -1 &&\n" +
    "        window.location.pathname.indexOf('/thank_you') !== -1) {\n" +
    '\n' +
    '      var twoMonthsFromNow = new Date(Date.now());\n' +
    '      twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2);\n' +
    '\n' +
    "      document.cookie = 'loggedConversion=' + window.location.pathname + '; expires=' + twoMonthsFromNow;\n" +
    '    }\n' +
    '  }\n' +
    '\n' +
    '  var trekkie = window.ShopifyAnalytics.lib = window.trekkie = window.trekkie || [];\n' +
    '  if (trekkie.integrations) {\n' +
    '    return;\n' +
    '  }\n' +
    '  trekkie.methods = [\n' +
    "    'identify',\n" +
    "    'page',\n" +
    "    'ready',\n" +
    "    'track',\n" +
    "    'trackForm',\n" +
    "    'trackLink'\n" +
    '  ];\n' +
    '  trekkie.factory = function(method) {\n' +
    '    return function() {\n' +
    '      var args = Array.prototype.slice.call(arguments);\n' +
    '      args.unshift(method);\n' +
    '      trekkie.push(args);\n' +
    '      return trekkie;\n' +
    '    };\n' +
    '  };\n' +
    '  for (var i = 0; i < trekkie.methods.length; i++) {\n' +
    '    var key = trekkie.methods[i];\n' +
    '    trekkie[key] = trekkie.factory(key);\n' +
    '  }\n' +
    '  trekkie.load = function(config) {\n' +
    '    trekkie.config = config;\n' +
    "    var script = document.createElement('script');\n" +
    "    script.type = 'text/javascript';\n" +
    '    script.onerror = function(e) {      var Monorail = {\n' +
    '      produce: function produce(monorailDomain, schemaId, payload) {\n' +
    '        var currentMs = new Date().getTime();\n' +
    '        var event = {\n' +
    '          schema_id: schemaId,\n' +
    '          payload: payload,\n' +
    '          metadata: {\n' +
    '            event_created_at_ms: currentMs,\n' +
    '            event_sent_at_ms: currentMs\n' +
    '          }\n' +
    '        };\n' +
    '        return Monorail.sendRequest("https://" + monorailDomain + "/v1/produce", JSON.stringify(event));\n' +
    '      },\n' +
    '      sendRequest: function sendRequest(endpointUrl, payload) {\n' +
    '        // Try the sendBeacon API\n' +
    "        if (window && window.navigator && typeof window.navigator.sendBeacon === 'function' && typeof window.Blob === 'function' && !Monorail.isIos12()) {\n" +
    '          var blobData = new window.Blob([payload], {\n' +
    "            type: 'text/plain'\n" +
    '          });\n' +
    '    \n' +
    '          if (window.navigator.sendBeacon(endpointUrl, blobData)) {\n' +
    '            return true;\n' +
    '          } // sendBeacon was not successful\n' +
    '    \n' +
    '        } // XHR beacon   \n' +
    '    \n' +
    '        var xhr = new XMLHttpRequest();\n' +
    '    \n' +
    '        try {\n' +
    "          xhr.open('POST', endpointUrl);\n" +
    "          xhr.setRequestHeader('Content-Type', 'text/plain');\n" +
    '          xhr.send(payload);\n' +
    '        } catch (e) {\n' +
    '          console.log(e);\n' +
    '        }\n' +
    '    \n' +
    '        return false;\n' +
    '      },\n' +
    '      isIos12: function isIos12() {\n' +
    "        return window.navigator.userAgent.lastIndexOf('iPhone; CPU iPhone OS 12_') !== -1 || window.navigator.userAgent.lastIndexOf('iPad; CPU OS 12_') !== -1;\n" +
    '      }\n' +
    '    };\n' +
    "    Monorail.produce('monorail-edge.shopifysvc.com',\n" +
    "      'trekkie_storefront_load_errors/1.0',\n" +
    '      {shop_id: 10124165201,\n' +
    '      theme_id: 47341666385,\n' +
    '      app_name: "storefront"});\n' +
    '\n' +
    '      \n' +
    '    };\n' +
    '    script.async = true;\n' +
    "    script.src = 'https://cdn.shopify.com/s/javascripts/tricorder/trekkie.storefront.min.js?v=2020.07.13.1';\n" +
    "    var first = document.getElementsByTagName('script')[0];\n" +
    '    first.parentNode.insertBefore(script, first);\n' +
    '  };\n' +
    '  trekkie.load(\n' +
    '    {"Trekkie":{"appName":"storefront","development":false,"defaultAttributes":{"shopId":10124165201,"isMerchantRequest":null,"themeId":47341666385,"themeCityHash":"6415049032207948118","contentLanguage":"en","currency":"EUR"},"isServerSideCookieWritingEnabled":true,"isPixelGateEnabled":true},"Performance":{"navigationTimingApiMeasurementsEnabled":true,"navigationTimingApiMeasurementsSampleRate":1},"Google Analytics":{"trackingId":"UA-51217306-2","domain":"auto","siteSpeedSampleRate":"10","enhancedEcommerce":true,"doubleClick":true,"includeSearch":true},"Facebook Pixel":{"pixelIds":["1162149407150389"],"agent":"plshopify1.2"},"Session Attribution":{}}\n' +
    '  );\n' +
    '\n' +
    '  var loaded = false;\n' +
    '  trekkie.ready(function() {\n' +
    '    if (loaded) return;\n' +
    '    loaded = true;\n' +
    '\n' +
    '    window.ShopifyAnalytics.lib = window.trekkie;\n' +
    '    \n' +
    "      ga('require', 'linker');\n" +
    '      function addListener(element, type, callback) {\n' +
    '        if (element.addEventListener) {\n' +
    '          element.addEventListener(type, callback);\n' +
    '        }\n' +
    '        else if (element.attachEvent) {\n' +
    "          element.attachEvent('on' + type, callback);\n" +
    '        }\n' +
    '      }\n' +
    '      function decorate(event) {\n' +
    '        event = event || window.event;\n' +
    '        var target = event.target || event.srcElement;\n' +
    "        if (target && (target.getAttribute('action') || target.getAttribute('href'))) {\n" +
    '          ga(function (tracker) {\n' +
    "            var linkerParam = tracker.get('linkerParam');\n" +
    "            document.cookie = '_shopify_ga=' + linkerParam + '; ' + 'path=/';\n" +
    '          });\n' +
    '        }\n' +
    '      }\n' +
    "      addListener(window, 'load', function(){\n" +
    '        for (var i=0; i < document.forms.length; i++) {\n' +
    "          var action = document.forms[i].getAttribute('action');\n" +
    "          if(action && action.indexOf('/cart') >= 0) {\n" +
    "            addListener(document.forms[i], 'submit', decorate);\n" +
    '          }\n' +
    '        }\n' +
    '        for (var i=0; i < document.links.length; i++) {\n' +
    "          var href = document.links[i].getAttribute('href');\n" +
    "          if(href && href.indexOf('/checkout') >= 0) {\n" +
    "            addListener(document.links[i], 'click', decorate);\n" +
    '          }\n' +
    '        }\n' +
    '      });\n' +
    '    \n' +
    '\n' +
    '    var originalDocumentWrite = document.write;\n' +
    '    document.write = customDocumentWrite;\n' +
    '    try { window.ShopifyAnalytics.merchantGoogleAnalytics.call(this); } catch(error) {};\n' +
    '    document.write = originalDocumentWrite;\n' +
    '      (function () {\n' +
    '        if (window.BOOMR && (window.BOOMR.version || window.BOOMR.snippetExecuted)) {\n' +
    '          return;\n' +
    '        }\n' +
    '        window.BOOMR = window.BOOMR || {};\n' +
    '        window.BOOMR.snippetStart = new Date().getTime();\n' +
    '        window.BOOMR.snippetExecuted = true;\n' +
    '        window.BOOMR.snippetVersion = 12;\n' +
    '        window.BOOMR.application = "storefront-renderer";\n' +
    '        window.BOOMR.themeName = "Prestige";\n' +
    '        window.BOOMR.themeVersion = "2.0.4";\n' +
    '        window.BOOMR.shopId = 10124165201;\n' +
    '        window.BOOMR.themeId = 47341666385;\n' +
    '        window.BOOMR.url =\n' +
    '          "https://cdn.shopify.com/shopifycloud/boomerang/shopify-boomerang-1.0.0.min.js";\n' +
    '        var where = document.currentScript || document.getElementsByTagName("script")[0];\n' +
    '        var parentNode = where.parentNode;\n' +
    '        var promoted = false;\n' +
    '        var LOADER_TIMEOUT = 3000;\n' +
    '        function promote() {\n' +
    '          if (promoted) {\n' +
    '            return;\n' +
    '          }\n' +
    '          var script = document.createElement("script");\n' +
    '          script.id = "boomr-scr-as";\n' +
    '          script.src = window.BOOMR.url;\n' +
    '          script.async = true;\n' +
    '          parentNode.appendChild(script);\n' +
    '          promoted = true;\n' +
    '        }\n' +
    '        function iframeLoader(wasFallback) {\n' +
    '          promoted = true;\n' +
    '          var dom, bootstrap, iframe, iframeStyle;\n' +
    '          var doc = document;\n' +
    '          var win = window;\n' +
    '          window.BOOMR.snippetMethod = wasFallback ? "if" : "i";\n' +
    '          bootstrap = function(parent, scriptId) {\n' +
    '            var script = doc.createElement("script");\n' +
    '            script.id = scriptId || "boomr-if-as";\n' +
    '            script.src = window.BOOMR.url;\n' +
    '            BOOMR_lstart = new Date().getTime();\n' +
    '            parent = parent || doc.body;\n' +
    '            parent.appendChild(script);\n' +
    '          };\n' +
    '          if (!window.addEventListener && window.attachEvent && navigator.userAgent.match(/MSIE [67]./)) {\n' +
    '            window.BOOMR.snippetMethod = "s";\n' +
    '            bootstrap(parentNode, "boomr-async");\n' +
    '            return;\n' +
    '          }\n' +
    '          iframe = document.createElement("IFRAME");\n' +
    '          iframe.src = "about:blank";\n' +
    '          iframe.title = "";\n' +
    '          iframe.role = "presentation";\n' +
    '          iframe.loading = "eager";\n' +
    '          iframeStyle = (iframe.frameElement || iframe).style;\n' +
    '          iframeStyle.width = 0;\n' +
    '          iframeStyle.height = 0;\n' +
    '          iframeStyle.border = 0;\n' +
    '          iframeStyle.display = "none";\n' +
    '          parentNode.appendChild(iframe);\n' +
    '          try {\n' +
    '            win = iframe.contentWindow;\n' +
    '            doc = win.document.open();\n' +
    '          } catch (e) {\n' +
    '            dom = document.domain;\n' +
    `            iframe.src = "javascript:var d=document.open();d.domain='" + dom + "';void(0);";\n` +
    '            win = iframe.contentWindow;\n' +
    '            doc = win.document.open();\n' +
    '          }\n' +
    '          if (dom) {\n' +
    '            doc._boomrl = function() {\n' +
    '              this.domain = dom;\n' +
    '              bootstrap();\n' +
    '            };\n' +
    `            doc.write("<body onload='document._boomrl();'>");\n` +
    '          } else {\n' +
    '            win._boomrl = function() {\n' +
    '              bootstrap();\n' +
    '            };\n' +
    '            if (win.addEventListener) {\n' +
    '              win.addEventListener("load", win._boomrl, false);\n' +
    '            } else if (win.attachEvent) {\n' +
    '              win.attachEvent("onload", win._boomrl);\n' +
    '            }\n' +
    '          }\n' +
    '          doc.close();\n' +
    '        }\n' +
    '        var link = document.createElement("link");\n' +
    '        if (link.relList &&\n' +
    '          typeof link.relList.supports === "function" &&\n' +
    '          link.relList.supports("preload") &&\n' +
    '          ("as" in link)) {\n' +
    '          window.BOOMR.snippetMethod = "p";\n' +
    '          link.href = window.BOOMR.url;\n' +
    '          link.rel = "preload";\n' +
    '          link.as = "script";\n' +
    '          link.addEventListener("load", promote);\n' +
    '          link.addEventListener("error", function() {\n' +
    '            iframeLoader(true);\n' +
    '          });\n' +
    '          setTimeout(function() {\n' +
    '            if (!promoted) {\n' +
    '              iframeLoader(true);\n' +
    '            }\n' +
    '          }, LOADER_TIMEOUT);\n' +
    '          BOOMR_lstart = new Date().getTime();\n' +
    '          parentNode.appendChild(link);\n' +
    '        } else {\n' +
    '          iframeLoader(false);\n' +
    '        }\n' +
    '        function boomerangSaveLoadTime(e) {\n' +
    '          window.BOOMR_onload = (e && e.timeStamp) || new Date().getTime();\n' +
    '        }\n' +
    '        if (window.addEventListener) {\n' +
    '          window.addEventListener("load", boomerangSaveLoadTime, false);\n' +
    '        } else if (window.attachEvent) {\n' +
    '          window.attachEvent("onload", boomerangSaveLoadTime);\n' +
    '        }\n' +
    '        if (document.addEventListener) {\n' +
    '          document.addEventListener("onBoomerangLoaded", function(e) {\n' +
    '            e.detail.BOOMR.init({\n' +
    '              producer_url: "https://monorail-edge.shopifysvc.com/v1/produce",\n' +
    '              ResourceTiming: {\n' +
    '                enabled: true,\n' +
    '                trackedResourceTypes: ["script", "img", "css"]\n' +
    '              },\n' +
    '            });\n' +
    '            e.detail.BOOMR.t_end = new Date().getTime();\n' +
    '          });\n' +
    '        } else if (document.attachEvent) {\n' +
    '          document.attachEvent("onpropertychange", function(e) {\n' +
    '            if (!e) e=event;\n' +
    '            if (e.propertyName === "onBoomerangLoaded") {\n' +
    '              e.detail.BOOMR.init({\n' +
    '                producer_url: "https://monorail-edge.shopifysvc.com/v1/produce",\n' +
    '                ResourceTiming: {\n' +
    '                  enabled: true,\n' +
    '                  trackedResourceTypes: ["script", "img", "css"]\n' +
    '                },\n' +
    '              });\n' +
    '              e.detail.BOOMR.t_end = new Date().getTime();\n' +
    '            }\n' +
    '          });\n' +
    '        }\n' +
    '      })();\n' +
    '    \n' +
    '\n' +
    '    if (!isDuplicatedThankYouPageView()) {\n' +
    '      setCookieIfThankYouPage();\n' +
    '      \n' +
    '        window.ShopifyAnalytics.lib.page(\n' +
    '          null,\n' +
    '          {"pageType":"password"}\n' +
    '        );\n' +
    '      \n' +
    '      \n' +
    '    }\n' +
    '  });\n' +
    '\n' +
    '  \n' +
    "      var eventsListenerScript = document.createElement('script');\n" +
    '      eventsListenerScript.async = true;\n' +
    '      eventsListenerScript.src = "//cdn.shopify.com/s/assets/shop_events_listener-d81deda6557a113fbcc6a993184828adcef6f241e4ca52b6a21169cb03169317.js";\n' +
    "      document.getElementsByTagName('head')[0].appendChild(eventsListenerScript);\n" +
    '    \n' +
    '})();</script>\n' +
    '<script integrity="sha256-JP8SIsmqE7shdlPA0+ooxAp5aigObaKa1CHuwqYHXIY=" data-source-attribution="shopify.loadfeatures" defer="defer" src="//cdn.shopify.com/s/assets/storefront/load_feature-24ff1222c9aa13bb217653c0d3ea28c40a796a280e6da29ad421eec2a6075c86.js" crossorigin="anonymous"></script>\n' +
    '<script crossorigin="anonymous" defer="defer" src="//cdn.shopify.com/s/assets/shopify_pay/storefront-21b5dddfc8b64c1ad68cee3ba7448d1ffa15c24e969ebc1fbccf1a3784b659ad.js?v=20190107"></script>\n' +
    '\n' +
    '\n' +
    '<style id="shopify-dynamic-checkout-cart">@media screen and (min-width: 750px) {\n' +
    '  #dynamic-checkout-cart {\n' +
    '    min-height: 50px;\n' +
    '  }\n' +
    '}\n' +
    '\n' +
    '@media screen and (max-width: 750px) {\n' +
    '  #dynamic-checkout-cart {\n' +
    '    min-height: 180px;\n' +
    '  }\n' +
    '}\n' +
    "</style><script>window.performance && window.performance.mark && window.performance.mark('shopify.content_for_header.end');</script>\n" +
    '\n' +
    '    <link rel="stylesheet" href="//cdn.shopify.com/s/files/1/0101/2416/5201/t/3/assets/theme.scss.css?v=8481039471135350133">\n' +
    '\n' +
    '    <script src="//cdn.shopify.com/s/files/1/0101/2416/5201/t/3/assets/lazysizes.min.js?v=17435836340443258698" async></script>\n' +
    '\n' +
    '    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=fetch,Element.prototype.closest,Element.prototype.remove,Element.prototype.classList,Array.prototype.includes,Array.prototype.fill,Object.assign,CustomEvent,IntersectionObserver,IntersectionObserverEntry" defer></script>\n' +
    '    <script src="//cdn.shopify.com/s/files/1/0101/2416/5201/t/3/assets/libs.min.js?v=8846682211898979100" defer></script>\n' +
    '    <script src="//cdn.shopify.com/s/files/1/0101/2416/5201/t/3/assets/theme.min.js?v=11510032472084199301" defer></script>\n' +
    '    <script src="//cdn.shopify.com/s/files/1/0101/2416/5201/t/3/assets/custom.js?v=881471708870390663" defer></script>\n' +
    '\n' +
    '    <script>\n' +
    '      // This allows to expose several variables to the global scope, to be used in scripts\n' +
    '      window.theme = {\n' +
    '        template: "password"\n' +
    '      };\n' +
    '\n' +
    "      document.documentElement.className = document.documentElement.className.replace('no-js', 'js');\n" +
    "      document.documentElement.style.setProperty('--window-height', window.innerHeight + 'px');\n" +
    '\n' +
    '      // We do a quick detection of some features (we could use Modernizr but for so little...)\n' +
    '      (function() {\n' +
    "        document.documentElement.className += ((window.CSS && window.CSS.supports('(position: sticky) or (position: -webkit-sticky)')) ? ' supports-sticky' : ' no-supports-sticky');\n" +
    "        document.documentElement.className += (window.matchMedia('(-moz-touch-enabled: 1), (hover: none)')).matches ? ' no-supports-hover' : ' supports-hover';\n" +
    '      }());\n' +
    '    </script>\n' +
    '\n' +
    '    \n' +
    '  <meta property="og:image" content="https://cdn.shopify.com/s/files/1/0101/2416/5201/files/LOGO_Saraceni_black.png?height=628&pad_color=ffffff&v=1559908231&width=1200" />\n' +
    '<meta property="og:image:secure_url" content="https://cdn.shopify.com/s/files/1/0101/2416/5201/files/LOGO_Saraceni_black.png?height=628&pad_color=ffffff&v=1559908231&width=1200" />\n' +
    '<meta property="og:image:width" content="1200" />\n' +
    '<meta property="og:image:height" content="628" />\n' +
    '</head>\n' +
    '\n' +
    '  <body class="prestige--v2 template-password">\n' +
    '    <div class="PageOverlay"></div>\n' +
    '\n' +
    '    <div class="PageContainer">\n' +
    '      <main id="main" role="main">\n' +
    '        <div id="shopify-section-password-template" class="shopify-section"><div class="FlexboxIeFix">\n' +
    '<div class="Password" style="background-image: url(//cdn.shopify.com/s/files/1/0101/2416/5201/t/3/assets/password_1500x.progressive.jpg?v=17117563642567373639)">\n' +
    '  <header class="Password__Header">\n' +
    '    <a href="/" class="Password__Logo"><span class="Heading u-h4">Test Saraceni Wines™</span></a>\n' +
    '\n' +
    '    <button class="Password__LockAction Heading u-h8" data-action="open-modal" aria-controls="modal-password">\n' +
    '      <span class="hidden-phone">Enter password</span> <svg class="Icon Icon--lock" role="presentation" viewBox="0 0 24 24">\n' +
    '      <g stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter">\n' +
    '        <path stroke-miterlimit="10" d="M12,1L12,1 C9.2,1,7,3.2,7,6v3h10V6C17,3.2,14.8,1,12,1z"></path>\n' +
    '        <rect x="4" y="9" stroke-miterlimit="10" width="16" height="14"></rect>\n' +
    '        <circle stroke-miterlimit="10" cx="12" cy="15" r="2"></circle>\n' +
    '        <line stroke-miterlimit="10" x1="12" y1="17" x2="12" y2="19"></line>\n' +
    '      </g>\n' +
    '    </svg>\n' +
    '    </button>\n' +
    '  </header>\n' +
    '\n' +
    '  <div class="Password__Content">\n' +
    '    <div class="Password__Newsletter Password__Card"><h1 class="Password__Heading Heading u-h2">Opening Soon</h1><div class="Password__Message Rte"><p>A short sentence describing what someone will receive by subscribing</p></div><form method="post" action="/contact#contact_form" id="contact_form" accept-charset="UTF-8" class="Password__Form Form Form--spacingTight Form--small"><input type="hidden" name="form_type" value="customer" /><input type="hidden" name="utf8" value="✓" /><input type="hidden" name="contact[tags]" value="prospect, password page">\n' +
    '\n' +
    '            <div class="Form__Group">\n' +
    '              <input type="email" class="Form__Input" name="contact[email]" placeholder="Your email address" aria-label="Your email address">\n' +
    '              <button type="submit" class="Button Button--primary Button--small">Notify me</button>\n' +
    '            </div></form></div><div class="Password__Social">\n' +
    '        <span class="Heading u-h5">Spread the word</span>\n' +
    '\n' +
    '        <div class="Password__ShareButtons ShareButtons">\n' +
    '          <a class="ShareButtons__Item ShareButtons__Item--facebook" href="https://www.facebook.com/sharer.php?u=https://apac-saraceni-wines.myshopify.com" target="_blank" rel="noopener"><svg class="Icon Icon--facebook" viewBox="0 0 9 17">\n' +
    '      <path d="M5.842 17V9.246h2.653l.398-3.023h-3.05v-1.93c0-.874.246-1.47 1.526-1.47H9V.118C8.718.082 7.75 0 6.623 0 4.27 0 2.66 1.408 2.66 3.994v2.23H0v3.022h2.66V17h3.182z"></path>\n' +
    '    </svg></a>\n' +
    '          <a class="ShareButtons__Item ShareButtons__Item--twitter" href="https://twitter.com/share?url=https://apac-saraceni-wines.myshopify.com" target="_blank" rel="noopener"><svg class="Icon Icon--twitter" role="presentation" viewBox="0 0 32 26">\n' +
    '      <path d="M32 3.077c-1.1748.525-2.4433.8748-3.768 1.031 1.356-.8123 2.3932-2.0995 2.887-3.6305-1.2686.7498-2.6746 1.2997-4.168 1.5934C25.751.796 24.045.0025 22.158.0025c-3.6242 0-6.561 2.937-6.561 6.5612 0 .5124.0562 1.0123.1686 1.4935C10.3104 7.7822 5.474 5.1702 2.237 1.196c-.5624.9687-.8873 2.0997-.8873 3.2994 0 2.2746 1.156 4.2867 2.9182 5.4615-1.075-.0314-2.0872-.3313-2.9745-.8187v.0812c0 3.1806 2.262 5.8363 5.2677 6.4362-.55.15-1.131.2312-1.731.2312-.4248 0-.831-.0438-1.2372-.1188.8374 2.6057 3.262 4.5054 6.13 4.5616-2.2495 1.7622-5.074 2.812-8.1546 2.812-.531 0-1.0498-.0313-1.5684-.0938 2.912 1.8684 6.3613 2.9494 10.0668 2.9494 12.0726 0 18.6776-10.0043 18.6776-18.6776 0-.2874-.0063-.5686-.0188-.8498C30.0066 5.5514 31.119 4.3954 32 3.077z"></path>\n' +
    '    </svg></a>\n' +
    '          <a class="ShareButtons__Item ShareButtons__Item--pinterest" href="https://pinterest.com/pin/create/button/?url=https://apac-saraceni-wines.myshopify.com" target="_blank" rel="noopener"><svg class="Icon Icon--pinterest" role="presentation" viewBox="0 0 32 32">\n' +
    '      <path d="M16 0q3.25 0 6.208 1.271t5.104 3.417 3.417 5.104T32 16q0 4.333-2.146 8.021t-5.833 5.833T16 32q-2.375 0-4.542-.625 1.208-1.958 1.625-3.458l1.125-4.375q.417.792 1.542 1.396t2.375.604q2.5 0 4.479-1.438t3.063-3.937 1.083-5.625q0-3.708-2.854-6.437t-7.271-2.729q-2.708 0-4.958.917T8.042 8.689t-2.104 3.208-.729 3.479q0 2.167.812 3.792t2.438 2.292q.292.125.5.021t.292-.396q.292-1.042.333-1.292.167-.458-.208-.875-1.083-1.208-1.083-3.125 0-3.167 2.188-5.437t5.729-2.271q3.125 0 4.875 1.708t1.75 4.458q0 2.292-.625 4.229t-1.792 3.104-2.667 1.167q-1.25 0-2.042-.917t-.5-2.167q.167-.583.438-1.5t.458-1.563.354-1.396.167-1.25q0-1.042-.542-1.708t-1.583-.667q-1.292 0-2.167 1.188t-.875 2.979q0 .667.104 1.292t.229.917l.125.292q-1.708 7.417-2.083 8.708-.333 1.583-.25 3.708-4.292-1.917-6.938-5.875T0 16Q0 9.375 4.687 4.688T15.999.001z"></path>\n' +
    '    </svg></a>\n' +
    '        </div>\n' +
    '      </div></div>\n' +
    '\n' +
    '  <footer class="Password__Footer"><span class="Password__PoweredBy Heading u-h8">This store will be powered by <a href="//www.shopify.com" target="_blank" title="Create your own online store with Shopify"><svg class="Icon Icon--shopify-logo" role="presentation" viewBox="0 0 150 43">\n' +
    '      <path fill="currentColor" d="M33.3 8.9s0-.2-.1-.3c-.1-.1-.2-.1-.2-.1l-3.4-.2-2.1-2.1c-.1-.1-.2-.1-.3-.1l-1.8 36.1L38 39.5 33.3 8.9zm-7.5-3l-.9.3c-.6-1.6-1.3-2.8-2.3-3.5-.7-.5-1.5-.7-2.3-.6l-.6-.6c-.9-.7-2.1-.9-3.6-.3C11.8 2.7 10 8.3 9.3 11l-3.8 1.1s-.9.2-1.1.5c-.2.3-.3 1-.3 1L.9 37.9l23.6 4.4L26.3 6c-.2-.2-.4-.1-.5-.1zm-5.7 1.7L16 8.9c.5-2.1 1.6-4.3 3.6-5.1.4 1 .5 2.5.5 3.8zm-3.5-5.2c.9-.3 1.6-.3 2.1 0-2.7 1.2-3.9 4.3-4.4 6.9l-3.3 1c.7-2.5 2.3-6.7 5.6-7.9zm2.3 17.9c-.2-.1-.4-.2-.7-.3-.3-.1-.5-.2-.8-.3-.3-.1-.6-.1-1-.2h-1.1c-.3 0-.6.1-.9.2-.3.1-.5.2-.7.4-.2.2-.3.4-.4.6-.1.2-.2.5-.2.7 0 .2 0 .4.1.6l.3.6.6.6c.2.2.5.4.8.6.5.3.9.6 1.4 1 .5.4.9.8 1.2 1.3.4.5.7 1 .9 1.7.2.6.3 1.3.3 2.1-.1 1.2-.3 2.3-.8 3.2-.4.9-1.1 1.6-1.8 2.1s-1.6.8-2.5.9c-.9.1-1.9.1-2.8-.2-.5-.1-.9-.3-1.3-.4l-1.2-.6c-.3-.2-.7-.4-.9-.6-.3-.2-.5-.4-.7-.7L7.8 30c.2.2.4.3.7.5.3.2.6.4.9.5.3.2.7.3 1 .5.4.1.7.2 1.1.3h.8c.2-.1.5-.2.6-.3.2-.1.3-.3.4-.5.1-.2.1-.4.2-.7 0-.2 0-.5-.1-.7-.1-.2-.2-.4-.3-.7-.1-.2-.3-.4-.6-.7-.2-.2-.5-.5-.9-.7-.4-.3-.8-.6-1.2-1-.3-.4-.7-.7-.9-1.2-.2-.4-.4-.9-.6-1.4-.1-.5-.2-1-.2-1.6 0-1 .2-1.8.6-2.6.3-.8.8-1.5 1.4-2.2.6-.6 1.3-1.2 2.2-1.6.9-.4 1.8-.7 2.9-.9.5-.1 1-.1 1.4-.1.5 0 .9 0 1.3.1s.8.1 1.1.2l.9.3-1.6 4.8zm2.6-13.1v-.5c0-1.3-.2-2.4-.5-3.2.3 0 .6.1.9.3.8.5 1.3 1.6 1.7 2.8l-2.1.6zM45.3 29.6c.9.5 2.5 1.1 4.1 1.1 1.4 0 2.2-.8 2.2-1.7 0-.9-.5-1.5-2.1-2.4-1.9-1.1-3.3-2.6-3.3-4.6 0-3.5 3-6 7.4-6 1.9 0 3.4.4 4.2.8l-1.2 3.5c-.7-.3-1.8-.7-3.1-.7-1.4 0-2.3.6-2.3 1.7 0 .8.7 1.4 1.9 2 2 1.1 3.6 2.6 3.6 4.7 0 4-3.2 6.2-7.7 6.1-2.1 0-4-.6-4.9-1.2l1.2-3.3zm12.4 4.5l4.9-25.2h5l-1.9 9.8h.1c1.3-1.6 3.1-2.7 5.3-2.7 2.6 0 4.1 1.7 4.1 4.5 0 .9-.1 2.2-.4 3.3l-2 10.3h-5l1.9-9.9c.1-.7.2-1.5.2-2.2 0-1.1-.4-1.8-1.6-1.8-1.6 0-3.3 2-4 5.3l-1.7 8.7h-4.9v-.1zM93.3 23c0 6.1-4 11.4-9.9 11.4-4.5 0-6.9-3.1-6.9-6.9 0-6 4-11.4 10-11.4 4.7 0 6.8 3.3 6.8 6.9zm-11.7 4.3c0 1.8.7 3.2 2.4 3.2 2.7 0 4.1-4.7 4.1-7.7 0-1.5-.6-3-2.4-3-2.6.1-4.1 4.7-4.1 7.5zm10.5 13.8L95.6 23c.4-2 .8-4.7 1-6.6h4.4l-.3 2.8h.1c1.3-1.9 3.3-3 5.3-3 3.7 0 5.2 2.9 5.2 6.3 0 6-3.9 12.1-9.7 12.1-1.2 0-2.4-.5-2.9-.5h-.1l-1.4 7h-5.1zm7.2-11.2c.5.4 1.2.7 2.1.7 2.8 0 4.7-4.6 4.7-7.8 0-1.3-.5-2.7-2-2.7-1.7 0-3.4 2-4 5.1l-.8 4.7zm12.2 4.2l3.4-17.7h5.1l-3.4 17.7h-5.1zm6.5-19.6c-1.4 0-2.4-1.1-2.4-2.6 0-1.6 1.3-2.9 2.9-2.9 1.5 0 2.5 1.1 2.5 2.6 0 1.8-1.4 2.9-3 2.9zm2.9 19.6l2.7-14h-2.3l.7-3.7h2.3l.1-.8c.4-2.1 1.2-4.2 2.9-5.6 1.3-1.1 3.1-1.6 4.9-1.6 1.2 0 2.1.2 2.7.4l-1 3.9c-.4-.1-.9-.3-1.6-.3-1.7 0-2.7 1.5-3 3.2l-.2.8h3.5l-.7 3.7h-3.5l-2.7 14h-4.8zm18-17.7l.8 7.9c.2 1.8.4 3.3.4 4.2h.1c.4-.9.8-2.3 1.5-4.2l3.1-7.9h5.2l-6.1 13.1c-2.2 4.5-4.3 7.7-6.6 9.9-1.8 1.7-3.9 2.5-4.9 2.7l-1.4-4.2c.8-.3 1.9-.7 2.8-1.4 1.2-.8 2.1-1.9 2.7-3 .1-.3.2-.5.1-1.9l-3-15.2h5.3z"></path>\n' +
    '    </svg></a></span>\n' +
    '    <span class="Password__AdminLink Heading u-h8">Are you the store owner? <a href="/admin" class="Link Link--underline">Login here</a></span>\n' +
    '  </footer>\n' +
    '  </div>\n' +
    '</div>\n' +
    '\n' +
    '<div id="modal-password" class="Password__Modal Modal Modal--fullScreen" aria-hidden="true" role="dialog" data-scrollable>\n' +
    '  <button class="Modal__Close Modal__Close--outside" data-action="close-modal"><svg class="Icon Icon--close" role="presentation" viewBox="0 0 16 14">\n' +
    '      <path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fill-rule="evenodd"></path>\n' +
    '    </svg></button>\n' +
    '\n' +
    '  <div class="Modal__Content">\n' +
    '    <div class="Password__Content">\n' +
    '      <div class="Password__Card">\n' +
    '        <h1 class="Password__Heading Heading u-h2">Enter password</h1><form method="post" action="/password#modal-password" id="login_form" accept-charset="UTF-8" class="Password__Form Form Form--spacingTight Form--small"><input type="hidden" name="form_type" value="storefront_password" /><input type="hidden" name="utf8" value="✓" /><div class="Form__Group">\n' +
    '            <input type="password" class="Form__Input" name="password" placeholder="Your password" aria-label="Your password" autofocus>\n' +
    '            <button type="submit" name="commit" class="Button Button--primary Button--small">Enter</button>\n' +
    '          </div></form></div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>\n' +
    '\n' +
    '<style>\n' +
    '  .Password__Header .Heading,\n' +
    '  .Password__Footer .Heading {\n' +
    '    color: #ffffff;\n' +
    '  }</style>\n' +
    '\n' +
    '</div>\n' +
    '      </main>\n' +
    '    </div>\n' +
    '  </body>\n' +
    '</html>'

