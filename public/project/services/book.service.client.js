/**
 * Created by wuhao on 2017-03-26.
 */
(function () {
    angular
        .module("AutonomousWriters")
        .factory("BookService", BookService);

    function BookService($http) {
        var api = {
            "createBook": createBook,
            "findBookById": findBookById,
            "updateBook": updateBook,
            "deleteBook": deleteBook,
            "findBookByTitle": findBookByTitle,
            "findBooksByAuthorId": findBooksByAuthorId,
            "findBookByISBN": findBookByISBN
        };
        return api;

        function createBook(userId, newBook) {
            return $http.post("/aw/api/writer/" + userId +"/book", newBook);
        }

        function findBookById(bookId) {
            return $http.get("/aw/api/book/" + bookId);
        }

        function updateBook(newBook) {
            return $http.put("/aw/api/book", newBook);
        }

        function deleteBook(bookId) {
            return $http.delete("/aw/api/book", bookId);
        }

        function findBookByTitle(title) {
            return $http.get("/aw/api/book?title=" + title);
        }

        function findBooksByAuthorId(author) {
            return $http.get("/aw/api/book?authorId=" + author);
        }
        
        function findBookByISBN(isbn) {
            return $http.get("/aw/api/book?ISBN=" + isbn);
        }
    }
})();

/*
 1. title
 2. authors: [ref to users]
 3. ISBN
 4. articles: [references to articles]
 5. subscriber: []
 6. categories:
 7. liked: number of total liked
 */