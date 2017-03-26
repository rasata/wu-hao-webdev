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
            "findBooksByAuthor": findBooksByAuthor,
            "findBookByISBN": findBookByISBN
        };
        return api;

        function createBook(newBook) {
            return $http.post("/api/book", newBook);
        }

        function findBookById(bookId) {
            return $http.get("/api/book", bookId);
        }

        function updateBook(newBook) {
            return $http.put("/api/book", newBook);
        }

        function deleteBook(bookId) {
            return $http.delete("/api/book", bookId);
        }

        function findBookByTitle(title) {
            return $http.get("/api/book?title=" + title);
        }

        function findBooksByAuthor(author) {
            return $http.get("/api/book?author=" + author);
        }
        
        function findBookByISBN(isbn) {
            return $http.get("/api/book?isbn=" + isbn);
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