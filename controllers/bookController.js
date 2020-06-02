const Book = require('../schema/bookSchema.js');
const User = require('../schema/userSchema.js');

module.exports = function (app) {
    app.post('/getAll', function(req, res) {
        Book.find({}, (err, books) => {
            var bookMap = [];
            books.forEach((book) => {
                bookMap.push(book);
            });
            res.status(200).json({
                books: bookMap,
                text: "Succès"
            });
        });
    });
    
    app.post('/create', function(req, res) {
        var book = {
            title: req.body.title,
            text: req.body.text,
            author: User.getUser(req.body.author).email
        };
        var _b = new Book(book);
        _b.save((err, book) => {
            if (err) {
                res.status(500).json({
                    text: "Erreur interne"
                });
            } else {
                res.status(200).json({
                    text: "Succès"
                });
            }
        });
    });
}