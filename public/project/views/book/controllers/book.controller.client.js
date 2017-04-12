/**
 * Created by wuhao on 2017-03-26.
 */
(function () {
    angular
        .module("AutonomousWriters")
        .controller("NewBookController", NewBookController)
        .controller("EditBookController", EditBookController);
    
    function NewBookController($routeParams, $location, BookService) {
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.createBook = createBook;

        function init() {
            var promise = BookService.findBooksByAuthorId(vm.userId);
            promise.success(function (books) {
                vm.published = books;
            })
        }
        init();

        function createBook(book) {
            book.genres = parseGenres(book.genres);

            var promise = BookService.createBook(vm.userId, book);
            promise.success(
                function (book) {
                    init();
                    $location.url("/writer/" + vm.userId + "/published");
                });

            promise.error(function (res, status) {
                vm.error = res;
            });
        }

        function parseGenres(genresStr) {
            var temp = genresStr.split(',');
            return temp;
        }
    }

    function EditBookController($routeParams, $location, BookService) {
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.bookId = $routeParams.bid;

        vm.updateBook = updateBook;
        vm.deleteBook = deleteBook;

        function init() {
            var promise = BookService.findBookById(vm.bookId);
            promise.success(function (book) {
                console.log("found book: " + vm.bookId);
                console.log(JSON.stringify(book));
                vm.book = book;
            });

            promise.error(function (res, status) {
                vm.error = res;
            });
        }
        init();

        function updateBook() {
            var promise = BookService.updateBook(vm.bookId, vm.book);
            promise.success(function (book) {
                init();
                vm.message = "Update Success!";
            });
            promise.error(function (res, status) {
                vm.error = res;
            });
        }

        function deleteBook() {
            var promise = BookService.deleteBook(vm.book._id);
            promise.success(function () {
                $location.url("/writer/" + vm.userId + "/published");
            })
        }
    }
})();