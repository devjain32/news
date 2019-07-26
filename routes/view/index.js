var router = require("express").Router();
var db = require("../../models");

router.get("/", function (req, res) {
    db.Article.find({}, null, {sort: {created: -1}}, function(error, data) {
        if (data.length === 0) {
            res.render("placeholder", {message: "There's nothing scraped yet! Click here to scrape and get the second most up-to-date news from NPR (the most up-to-date news is from the NPR website itself lmaooo there's really no point to this website)."})
        }
        else {
            res.render("index", {articles: data})
        }
    })
})

router.get("/saved", function(req, res) {
    db.Article.find({isSaved: true}).sort({created: -1}, function(error, data) {
        if (data.length === 0) {
            res.render("placeholder", {message: "There's nothing saved yet! Click here to get the second most up-to-date news from NPR (the most up-to-date news is from the NPR website itself lmaooo there's really no point to this website)."})
        }
        else {
            res.render("index", {saved: data})
        }
    })
})

module.exports = router;