var express = require("express");
var mongojs = require("mongojs");
var cheerio = require("cheerio");
var axios = require("axios");
var app = express();
app.use(express.static("public"));

var databaseUrl = "npr";
var collections = ["news"];

var db = mongojs(databaseUrl, collections);

db.on("error", function (error) {
    console.log("Database error: " + error);
})

app.get("/", function (req, res) {
    res.send("National Public Radio Web Scraper");
})

app.get("/all", function (req, res) {

})

axios.get("https://www.npr.org/sections/news/").then(function (response) {
    var $ = cheerio.load(response.data);
    var results = [];

    $("article.item").each(function (i, element) {
        var title = $(element).find("h2.title").text();
        var description = $(element).find("p.teaser").text();
        var image = $(element).find(".item-image").find("img").attr("src");
        var array = description.split(" • ");

        // results.push({
        //     title: title,
        //     image: image,
        //     date: array[0],
        //     description: array[1]
        // });
        article.create({
            title: title,
            image: image,
            date: array[0],
            description: array[1]
        });
    });
    db.news.insert(results);
})