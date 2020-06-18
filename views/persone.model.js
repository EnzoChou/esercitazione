var mongoose = require("mongoose");

var PersoneSchema = new mongoose.Schema({
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

mongoose.model( 'Persona', PersoneSchema );
