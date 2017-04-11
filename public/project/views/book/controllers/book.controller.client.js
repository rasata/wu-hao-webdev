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
            var promise = BookService.createBook(vm.userId, book);
            promise.success(
                function (book) {
                    init();
                });

            promise.error(function (res, status) {
                vm.error = res;
            });
        }
    }

    function EditBookController($routeParams, $location, BookService) {
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.bookId = $routeParams.bid;

        vm.updateBook = updateBook;
        vm.deleteBook = deleteBook;

        function init() {
            console.log("Say you hate me");
            var promise = BookService.findBookById(vm.bookId);
            promise.success(function (book) {
                vm.book = book;
                console.log("this book");
                console.log(JSON.stringify(book));
            });

            promise.error(function (res, status) {
                vm.error = res;
            });
        }
        init();

        function updateBook(book) {
            var promise = BookService.updateBook(book);
            promise.success(function (book) {
                init();
            });
            promise.error(function (res, status) {
                vm.error = res;
            });
        }

        function deleteBook() {
            var promise = BookService.deleteBook(vm.book._id);
            promise.success(function () {
                $location.url("#/writer/" + vm.userId + "/published");
            })
        }
    }

})();