(function () {
    angular
        .module("AutonomousWriters")
        .controller("WriterController", WriterController);

    function WriterController($rootScope, $location, $routeParams, UserService, BookService) {
        var vm = this;
        var userId = $routeParams.uid;

        function init() {
            // TODO: find books by user id
            var promise = BookService.findBooksByAuthorId(userId);
            promise.success(function (books) {
                vm.bookshelf = books;
            });
            promise.error(function (res, status) {
                vm.error = res;
            });
        }
        init();

    }
})();