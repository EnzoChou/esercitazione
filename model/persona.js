var mongoose = require("mongoose");

//schema della persona
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
  }

});

module.exports = mongoose.model( 'Persona', personSchema, 'Persone' );

/*
module.exports = {
  person: mongoose.model( 'Persona', personSchema, 'Persone' ),
  schemas: schemas
};
*/
