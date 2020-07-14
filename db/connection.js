var mongoose = require("mongoose");
//connection to db

//require database URL from properties file
//var dbURL = require('./property').db;
var dbURL = "mongodb://localhost:27017/local";

function connect() {

  //qui servirebbe una connessione un pò più sicura.
  mongoose.connect(dbURL,
  { useUnifiedTopology: true, useNewUrlParser: true },
   (err)=>{
  if(!err){
    console.log("Success connecting to database");
  }
  else {
    console.log("Error connecting to database");
  }
});

};

function disconnect() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected');
  });
};

process.on('SIGINT', function(){
  mongoose.connection.close(function(){
    console.log("Mongoose default connection is disconnected due to application termination");
    process.exit(0);
  });
});

exports.connect = connect;
exports.disconnect = disconnect;
