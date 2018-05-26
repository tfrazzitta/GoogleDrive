var express = require("express");
var app = express();
var PORT = 3000;
var fs = require("fs");
var multer = require("multer");
var upload = multer({dest: "./uploads"});
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/Google");
var conn = mongoose.connection;

//app.use(express.bodyParser({uploadDir:'./uploads'}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("./public"));

var db= mongoose.connection;
  
  db.on("error", function(error){
  console.log("Mongoose Error",error)
  });
  db.once("open", function(error){
  console.log("Mongoose Rocks")
  });

//require("./routes/images.js")(app);
require("./routes/upload.js")(app);

app.listen(3000, function() {
  console.log("App running on port "+ PORT);
});

