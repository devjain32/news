var router = require("express").Router();
var articlesController = require("../../controllers/article");

router.get("/all", articlesController.findAll);
router.get("/:id", articlesController.findOne);
router.post("/", articlesController.findAll);
//router.put("/:id", articlesController.update);
// router.delete("/:id", articlesController.delete);
router.get("/scrape", articlesController.scrape);
router.get("/clear", articlesController.clear)


module.exports = router;