var router = require("express").Router();
var notesRoutes = require("./notes");
var articlesRoutes = require("./articles");

router.use("/articles", notesRoutes);
router.use("/notes", articlesRoutes);

module.exports = router;