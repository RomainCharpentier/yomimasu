const Book = require('../models/book.js');
const User = require('../models/user.js');

module.exports = function (router) {

    /**
     * POST Method : Return all the books
     */
    router.post('/getAll', function(req, res) {
        Book.find({}, (err, books) => {
            if (err) {
                res.status(500);
            } else {
                res.status(200).json(books);
            }
        });
    });

    /**
     * POST Method : Return a book
     */
    router.get('/get/:id', function(req, res) {
        Book.findOne({_id: req.params.id}, (err, books) => {
            if (err) {
                res.status(500);
            } else {
                res.status(200).json(books);
            }
        });
    });
    
    /**
     * POST Method : Create a book
     */
    router.post('/create', function(req, res) {
        const _b = new Book({
            title: req.body.title,
            text: req.body.text,
            author: User.getUser(req.body.author).email
        });
        _b.save((err, book) => {
            if (err) {
                console.log(err);
                res.status(500).end();
            } else {
                res.status(200).end();
            }
        });
    });
}