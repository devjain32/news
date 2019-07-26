function handleScrape(event){
    event.preventDefault();
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function (data) {
        console.log(data);
        $(".articles").empty();
        $.ajax({
            method: "GET",
            url: "/articles"
        }).then(function (dbArticle) {
            console.log(dbArticle);
            location.reload();
        }).catch(function (err) {
            console.log(err);
        })
    }).catch(function (err) {
        console.log(err);
    });
}

$("#scraper").on("click", handleScrape);