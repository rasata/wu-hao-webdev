/**
 * Created by wuhao on 2017-03-26.
 */
(function () {
    angular
        .module("AutonomousWriters")
        .controller("ReaderController", ReaderController);

    function ReaderController($routeParams, $location, UserService) {
        var vm = this;

        vm.userId = $routeParams.uid;

        function init() {
            var promise = UserService.findUserById(vm.userId);
            promise.success(function (user) {
                vm.user = user;

                if(user.role === "reader") {
                    vm.bookshelfUrl = "/reader/" + user._id + "/bookshelf";
                } else if (user.role === "writer") {
                    vm.bookshelfUrl = "/writer/" + user._id + "/published";
                }
            });
        }
        init();

        function logout(userId) {
            if (!userId) {
                userId = $rootScope.currentUser._id;
            }

            var promise = UserService.logout(userId);

            promise.success(function (response) {
                $rootScope.currentUser = null;
                $location.url("/home");
            });
        }
    }
})();