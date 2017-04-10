/**
 * Created by wuhao on 2017-03-26.
 */
module.exports = function () {
    var api = {};

    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;

    var BookSchema = require('./book.schema.server')();
    var BookModel = mongoose.model('AWBookModel', BookSchema);

    return api;

    function createBook(userId, newBook) {
        newBook.authors.push(userId);
        return BookModel.create(newBook);
    }

    function updateBook(bookId, newBook) {
        return BookModel.update({_id: bookId, $set: newBook});
    }

    function findBookById(bookId) {
        return BookModel.findById(bookId);
    }

    function deleteBook(bookId) {
        return BookModel.remove({_id: bookId});
    }

    function findBooksByAuthorId(authorId) {
        return BookModel.find({authors: authorId});
    }

    // TODO: add/remove article, etc.
};

/*
1. CRUD for book
2. add/remove article, etc.
3.
 */