var data = {
    "pollo": {
        "tags": ["pennuto"],
        "ricette": [{
            "nome": "Chicken masala",
            "tags": ["coriandolo", "piccante", "acidità"],
            "ingredienti": ["curry", "yogurt"],
            "vini": [{
                "name": "vino 1",
                "product_id": "12345"
            }]
        }]
    }
};

var ricette = [{
    "nome": "Chicken masala",
    "tags": ["coriandolo", "piccante", "acidità"],
    "ingredienti": ["pollo", "curry", "yogurt"],
    "vini": [{
        "name": "vino 1",
        "product_id": "12345"
    }]
}];

var ingredienti_1 = [{
    "pollo": {
        "tags": ["pennuto"],
        "ricette": []
    }
}];

// test di estrazione delle ricette su parola chiave
var ingrediente_principale = "pollo";
var ricetta_founded = ricette.filter(ricetta => {
    return ricetta['ingredienti'].includes(ingrediente_principale)
});



ricetta_founded = [{
    "nome": "Chicken masala",
    "tags": ["coriandolo", "piccante", "acidità"],
    "ingredienti": ["pollo", "curry", "yogurt"],
    "vini": [{
        "name": "vino 1",
        "product_id": "12345"
    }]
}];

var ingredienti_2 = [{
    "curry": {
        "tags": ["pennuto"],
        "ricette": [{
            "nome": "Chicken masala",
            "tags": ["coriandolo", "piccante", "acidità"],
            "ingredienti": ["pollo", "curry", "yogurt"],
            "vini": [{
                "name": "vino 1",
                "product_id": "12345"
            }]
        }]
    }
}];

var ingredienti_3 = [{
    "yogurt": {
        "tags": ["pennuto"],
        "ricette": [{
            "nome": "Chicken masala",
            "tags": ["coriandolo", "piccante", "acidità"],
            "ingredienti": ["pollo", "curry", "yogurt"],
            "vini": [{
                "name": "vino 1",
                "product_id": "12345"
            }]
        }]
    }
}];

var word = "stasera vorrei mangiare pollo";

word_array = word.split(/\s+/gi);
word_array = ["pollo", "al", "curry"];
word_post_stop_words = ["pollo", "curry"];

.............

var word_founded = "pollo";

// stop words

var ricerca = data[word];

// esempio estrazione ricetta 
var word = "stasera cucino Chicken masala";
var word_founded = "Chicken masala";

// esempio estrazione ingrediente 1
var word = "stasera vorrei mangiare pollo";
var word_founded = "pollo";

// esempio estrazione ingrediente 1
var word = "stasera ho voglia di mangiare qualcosa con il curry";
var word_founded = "curry";
