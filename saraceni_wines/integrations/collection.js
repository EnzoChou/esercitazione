var Promise = require('bluebird');
var shopifyApi = require('../api/shopifyApi');

/*
elemento 1  ---->  Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzkzNjA2NjA4OTc3
lunghezza prodotti della collezione 1 // Home page
elemento 2  ---->  Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzkzNzk5MTIwOTc3
lunghezza prodotti della collezione 0 // Bianchi
elemento 3  ---->  Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzkzNzk5MTUzNzQ1
lunghezza prodotti della collezione 20 // La nostra collezione
elemento 4  ---->  Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzkzNzk5MTg2NTEz
lunghezza prodotti della collezione 0 // Bollicine
elemento 5  ---->  Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzkzNzk5MjE5Mjgx
lunghezza prodotti della collezione 20 // Best sellers
elemento 6  ---->  Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzkzNzk5Mjg0ODE3
lunghezza prodotti della collezione 0 // Rossi
elemento 7  ---->  Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzkzNzk5MzE3NTg1
lunghezza prodotti della collezione 3 // Rosè
elemento 8  ---->  Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzkzNzk5MzUwMzUz
lunghezza prodotti della collezione 0 // La nostra collezione
elemento 9  ---->  Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzkzNzk5MzgzMTIx
lunghezza prodotti della collezione 0 // Italian Iconic Sparklers™
elemento 10  ---->  Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzkzNzk5NDE1ODg5
lunghezza prodotti della collezione 0 // Libero Collection
elemento 11  ---->  Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzkzNzk5NDgxNDI1
lunghezza prodotti della collezione 0 // Villa Machiavelli
elemento 12  ---->  Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzkzNzk5NTc5NzI5
lunghezza prodotti della collezione 0 // Le Box
elemento 13  ---->  Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzkzNzk5NjEyNDk3
lunghezza prodotti della collezione 0 // Baby Bubbly™
elemento 14  ---->  Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzkzNzk5NjQ1MjY1
lunghezza prodotti della collezione 0 // Cuvée Monogram Franciacorta
elemento 15  ---->  Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzE2MzI3ODQ1NDg2NQ==
lunghezza prodotti della collezione 0 // Digital Goods VAT Tax
elemento 16  ---->  Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzE2MzI5NTQ5NDIyNQ==
lunghezza prodotti della collezione 0 // Liquori
*/

function processing(user, event, param) {
    return new Promise((resolve, reject) => {
        console.log('param', param);
        if (param) {
            return shopifyApi.fetchCollectionById(param)
                .then(collection => {
                    console.log('recuperato questi vini ---> ');
                    collection.products.forEach(element => {
                        console.log('titolo vino ---> ', element.title);
                    });
                    console.log('titolo collezione ---> ', collection.title);
                    console.log('prodotti della collezione ---> ', collection.products);
                    resolve(collection.products);
                })
                .catch(err => {
                    console.log('errore in processing collection', err);
                    resolve();
                })
        } else {
            return shopifyApi.fetchAllCollections()
                .then(collections => {
                    var cont = 1;
                    console.log('recuperate queste collezioni', collections); +
                    console.log('questi sono gli id', collections.forEach(element => {
                        console.log('elemento', cont, ' ----> ', element.id);
                        console.log('lunghezza prodotti della collezione', element.products.length);
                        cont++;
                    }));
                    resolve(collections);
                })
                .catch(err => {
                    console.log('errore in processing all collections', err);
                    resolve();
                })
        }
    })
}

var idLaNostraCollezione = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzkzNzk5MTUzNzQ1'; // 20 vini
var idBestSellers = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzkzNzk5MjE5Mjgx'; // 20 vini
var idHomePage = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzkzNjA2NjA4OTc3'; // 1 vino
var idRosè = 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzkzNzk5MzE3NTg1'; // 3 vini

// processing({}, {}, 'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzkzNjA2NjA4OTc3');