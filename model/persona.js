var mongoose = require("mongoose");

//schema della persona Nome, Cognome, anno di nascita(Date), città, indirizzo, età(int), iscritto(bool)
var personSchema = new mongoose.Schema({
  name : {
    type : String,
    required : "Required"
  },
  surname : {
    type : String,
    required : "Required"
  },
  birthplace : {
    type : String
  },
  birthdate : {
    type : Date
  },
  status : {
    type : String
  },
  address : {
    type : String
  },
  age : {
    type : Date
  },
  subscription : {
    type : Boolean
  }

});

module.exports = mongoose.model( 'Persona', personSchema, 'Persone' );

/*
module.exports = {
  person: mongoose.model( 'Persona', personSchema, 'Persone' ),
  schemas: schemas
};
*/
