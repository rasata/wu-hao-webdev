/**
 * Created by wuhao on 2017-03-26.
 */
module.exports = function () {
    var api = {
        createBook: createBookForAuthor,
        findBookById: findBookById,
        findAllBooksForAuthor: findAllBooksForAuthor,
        findAllBooks: findAllBooks,
        updateBook: updateBook,
        deleteBook: deleteBook,
        addSubscriber: addSubscriber,
        removeSubscriber: removeSubscriber
        // findSubscribers: findSubscribers
    };

    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;

    var BookSchema = require('./book.schema.server')();
    var BookModel = mongoose.model('AWBookModel', BookSchema);

    return api;

    function findPopularBooks() {
        // TODO:
    }

    function findAllBooks() {
        return BookModel.find();
    }

    function createBookForAuthor(userId, newBook) {
        if (newBook.authors) {
            newBook.authors.push(userId);
        } else {
            newBook.authors = [userId];
        }
        return BookModel.create(newBook);
    }

    function addSubscriber(bookId, userId) {
        return BookModel.update(
            {_id: bookId},
            {$push: {subscribers: userId}});
    }

    function removeSubscriber(bookId, userId) {
        return BookModel.update(
            {_id: bookId},
            {$pull: {subscribers: userId}});
    }
    
    function updateBook(bookId, newBook) {
        return BookModel.update({
            _id: bookId
        }, {
            title: newBook.title,
            authors: newBook.authors,
            isbn: newBook.isbn,
            articles: newBook.articles,
            subscribers: newBook.subscribers,
            genres: newBook.genres,
            // liked: newBook.liked,
            description: newBook.description
        });
    }

    function findBookById(bookId) {
        return BookModel.findById(bookId);
    }

    function deleteBook(bookId) {
        return BookModel.remove({_id: bookId});
    }

    function findAllBooksForAuthor(authorId) {
        return BookModel.find({authors: authorId});
    }

    // TODO: add/remove article, etc.
};