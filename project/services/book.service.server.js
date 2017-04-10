/**
 * Created by wuhao on 2017-03-26.
 */
module.exports = function (app, model) {
    app.post("/aw/api/writer/:userId/book", createBook);
    app.get("/aw/api/book/:boodid", findBookByBookId);
    app.put("/aw/api/book", updateBook);
    app.delete("/aw/api/book", deleteBook);
    app.get("/aw/api/book?authorid=authorid", findBoosByAuthodId);

    function findBoosByAuthodId(req, res) {
        var authorId = req.query.authorid;

        model.BookModel
            .findBooksByAuthorId(authorId)
            .then(
                function (response) {
                    res.send(response);
                }
            )
            .catch(function (err) {
                res.status(500).send(err);
            });
    }

    function createBook(req, res) {
        var userId = req.params.userId;
        var newBook = req.body;

        model.BookModel
            .createBook(userId, newBook)
            .then(function (book) {
                res.json(book);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findBookByBookId(req, res) {
        var bookId = req.params.bookid;

        model.BookModel
            .findBookById(bookId)
            .then(
                function (response) {
                    res.send(response);
                })
            .catch(function (err) {
                res.status(500).send(err);
            });
    }

    function updateBook(req, res) {
        var bookId = req.params.bookId;
        var newBook = req.body;

        model.BookModel
            .updateBook(bookId, newBook)
            .then(
                function (status) {
                    res.sendStatus(200);
                }
            )
            .catch(function (err) {
                res.status(500).send(err);
            });
    }

    function deleteBook(req, res) {
        var bookId = req.params.bookId;

        model.BookModel
            .deleteBook(bookId)
            .then(
                function (status) {
                    res.sendStatus(200);
                }
            )
            .catch(
                function (err) {
                    res.status(500).send(err);
                }
            );
    }
};