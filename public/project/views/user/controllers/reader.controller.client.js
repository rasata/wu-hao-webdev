/**
 * Created by wuhao on 2017-03-26.
 */
(function () {
    angular
        .module("AutonomousWriters")
        .controller("ReaderController", ReaderController);

    function ReaderController($rootScope, $routeParams, $location, UserService, BookService) {
        var vm = this;
        vm.logout = logout;

        vm.userId = $routeParams.uid;
        vm.removeBookFromShelf = removeBookFromShelf;

        function init() {
            var promise = UserService.findUserById(vm.userId);
            promise.success(function (user) {
                vm.user = user;
                vm.bookshelf = fillBookshelf(vm.user.bookshelf);
            });
            promise.error(function (res, status) {
                vm.error = res;
            });
        }

        init();

        function removeBookFromShelf(book) {
            // UserService remove book
            userPromise = UserService.removeFromBookshelf(book._id, vm.userId);
            userPromise.success(function (newUser) {
                bookPromise = BookService.removeSubscriber(book._id, vm.userId);
                bookPromise.success(function (bookRes) {
                    vm.message = "You have unsubscribed the book." + bookRes;
                });
                bookPromise.error(function (errorMsg, status) {
                    vm.error = errorMsg;
                });

                init();
            });

            userPromise.error(function (error, status) {
                vm.error = error;
            });
        }

        function fillBookshelf(booklist) {
            ret = [];

            for (var i = 0; i < booklist.length; ++i) {
                var resObj = new Object();
                resObj.updated = booklist[i].updated;

                var bookPromise = BookService.findBookById(booklist[i]._id);
                bookPromise.success(function (resBook) {
                    resObj.book = resBook;
                    ret.push(resObj);
                });
            }
            return ret;
        }

        function logout(user) {
            var promise = UserService.logout(user);

            promise.success(function (response) {
                $rootScope.currentUser = null;
                $location.url("/home");
            });

            promise.error(function (res, status) {
                vm.error = res;
            });
        }
    }
})();