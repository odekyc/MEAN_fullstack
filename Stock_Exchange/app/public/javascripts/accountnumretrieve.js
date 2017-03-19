$(document).ready(function() {

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/LoginCredentials", function(err, db) {
      if(!err) {
         db.logins.find(function(err, items) {
              console.log(items);
               db.close();
          });
         console.log("We are connected");
      }
      else{
        console.log(err);
      }
});

});