Progetto saraceni main folder: saraceni_wines

api:
    - viene usato un unico file: "shopifyApi" per eseguire richieste alle api di shopify.
    - il resto dei file vengono usati come script di prova in development.
    - si possono eseguire varie richieste tra cui:
        - createCheckout: crea un carrello nuovo e ritorna l'oggetto.
        - checkoutFetch: dato un id, ritorna il carrello di riferimento. Se non lo trova, ne crea uno nuovo e lo ritorna.
        - fetchById: dato un id, ritorna il prodotto (vino) ad esso associato. Torna undefined se l'id non è valido.
        - fetchAll: ritrova tutti i prodotti presenti nello shopify. Impostato il limite a 250.
        - addLineItems: dato l'id di un carrello e un oggetto lineItemsToAdd aggiunge il lineItemsToAdd al carrello e torna il carrello. Torna undefined se va in errore.
            - lineItemsToAdd: oggetto che necessita dei campi variantsId e quantity, si può aggiungere
            customAttributes: [{key: "MyKey", value: "MyValue" }]
        - updateLineItems: dato l'id di un carrello e un oggetto lineItemsToUpdate modifica la riga nel carrello con l'oggetto inviato. Torna undefined se va in errore.
            - lineItemsToUpdate: [{id:"dummy id", quantity:"n"}] ---> l'id è della riga del carrello
        - removeLineItems: dato l'id di un carrello e un array di stringhe di id di righe di carrello, questi le rimuove dal carrello. Torna undefined se va in errore.
        - fetchAllCollections: metodo per far tornare tutte le collezioni presenti nello shopify
        - fetchCollectionById: dato un id, torna la collezione associata. Se va in errore, ritorna tutte le collezioni presenti.

config:
    - dati confidenziali shopify

integrations:
    - cartella dedicata all'integrazione nel bot dell'algoritmo sviluppato in script

json:
    - struttura dati costruita da "script/scriptPerLaCreazioneDiListeUtiliInJsonDaExcel.js"

others:
    - lo script in "script/scriptPerLaCreazioneDiListeUtiliInJsonDaExcel.js" legge dal file chiamato ricette.xlsx
    - Saraceni - documentazione algoritmo di ricerca

script:
    - cartella dedicata alla logica di ricerca vini: file principale ---> ricercaVini

utils:
    - cartella di supporto per le integrazioni

  