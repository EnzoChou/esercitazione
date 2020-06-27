var mongoose = require("mongoose");
//connection to db
function connect() {

  //qui servirebbe una connessione un pò più sicura.
  mongoose.connect("mongodb://localhost:27017/local",
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

exports.connect = connect;
exports.disconnect = disconnect;
