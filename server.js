var express = require("express");
var exphbs = require("express-handlebars");
var mongojs = require("mongojs");
var cheerio = require("cheerio");
var axios = require("axios");
var routes = require("./routes/index.js");
console.log("here");
var logger = require("morgan");
var mongoose = require("mongoose");
console.log("here1");
var app = express();

var PORT = 3000;

app.use(routes);
app.use(logger);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// var databaseUrl = "npr";
// var collections = ["Article", "Note"];
// var db = mongojs(databaseUrl, collections);
// db.on("error", function (error) {
//     console.log("Database error: " + error);
// })

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/npr";
mongoose.connect(MONGODB_URI);

console.log("here2")
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
