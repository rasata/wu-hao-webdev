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

        function init() {
            var promise = BookService.findBooksByAuthorId(vm.userId);
            promise.success(function (books) {
                vm.bookshelf = books;
            })
        }
        init();

        function createBook(book) {
            BookService.createBook(book)
        }
    }

    function EditBookController($routeParams, $location, BookService) {
        var vm = this;

        vm.userId = $routeParams.uid;

        function init() {

        }
        init();
    }

})();