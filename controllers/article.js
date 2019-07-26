var db = require("../models");

module.exports = {
    findAll: function (req, res) {
        db.Article.find({}).then(
            function (articles) {
                res.json(articles)
            }
        )
    },
    findOne: function (req, res) {
        db.Article.findById(req.params.id).populate("note").then(
            function (articles) {
                res.json(articles)
            }
        )
    },
    clear: function (req, res) {
        db.Article.deleteMany({}).then(
            function (articles) {
                return db.Note.deleteMany({})
            }
        ).then(
            function () {
                res.send("All deleted!")
            }
        )
    },
    scrape: function (req, res) {
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
            });
            db.Articles.insert(results)
            console.log(results);
        });
        res.send("Scraped!")
    }
}