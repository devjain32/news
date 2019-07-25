var express = require("express");
var exphbs = require("express-handlebars");
var mongojs = require("mongojs");
var cheerio = require("cheerio");
var axios = require("axios");
var logger = require("morgan");
var mongoose = require("mongoose");
var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var databaseUrl = "npr";
var collections = ["news"];
var db = mongojs(databaseUrl, collections);

db.on("error", function (error) {
    console.log("Database error: " + error);
})

app.get("/", function (req, res) {
    db.Article.find({}, null, {sort: {created: -1}}, function(error, data) {
        if (data.length === 0) {
            res.render("placeholder", {message: "There's nothing scraped yet! Click here to scrape and get the second most up-to-date news from NPR (the most up-to-date news is from the NPR website itself lmaooo there's really no point to this website)."})
        }
        else {
            res.render("index", {articles: data})
        }
    })
    res.send("National Public Radio Web Scraper");
})

app.get("/scrape", function (req, res) {
    axios.get("https://www.npr.org/sections/news/").then(function (response) {
        var $ = cheerio.load(response.data);
        var results = [];

        $("article.item").each(function (i, element) {
            var title = $(element).find("h2.title").text();
            var description = $(element).find("p.teaser").text();
            var image = $(element).find(".item-image").find("img").attr("src");
            var array = description.split(" • ");

            results.push({
                title: title,
                image: image,
                date: array[0],
                description: array[1]
            });
            // article.create({
            //     title: title,
            //     image: image,
            //     date: array[0],
            //     description: array[1]
            // });
        });
        console.log(results);
        //db.news.insert(results);
        res.redirect("/")
    });
});

app.get("/saved", function(req, res) {
    db.news.find({isSaved: true}).sort({created: -1}, function(error, data) {
        if (data.length === 0) {
            res.render("placeholder", {message: "There's nothing saved yet! Click here to get the second most up-to-date news from NPR (the most up-to-date news is from the NPR website itself lmaooo there's really no point to this website)."})
        }
        else {
            res.render("index", {saved: data})
        }
    })
})

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });
  