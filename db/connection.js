var mongoose = require("mongoose");
var persone = require("../views/persone.model");
//connection to db
function connect() {

  mongoose.connect("mongodb://localhost:27017/Persone", { useUnifiedTopology: true, useNewUrlParser: true }, (err)=>{
  if(!err){
    console.log("Success connecting to database");
  }
  else {
    console.log("Error connecting to database");
  }
});

};

exports.connect = connect;
