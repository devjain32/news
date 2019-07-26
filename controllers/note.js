var db = require("../models");

module.exports = {
    findAll: function (req, res) {
        db.Note.find({}).then(
            function (notes) {
                res.json(notes)
            }
        )
    },
    create: function (req, res) {
        db.Note.create(req.body)
            .then(function (dbNote) {
                return db.Note.findOneAndUpdate(
                    { _id: req.params.id },
                    { $push: { note: dbNote._id } },
                    { new: true });
            })
            .then(function (Article) {
                res.json(Article);
            })
            .catch(function (err) {
                console.log(err);
                res.status(500).send();
            });
    },
    delete: function (req, res) {
        db.Note.deleteOne({})
    }
}