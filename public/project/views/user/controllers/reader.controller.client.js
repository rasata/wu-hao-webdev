/**
 * Created by wuhao on 2017-03-26.
 */
(function () {
    angular
        .module("AutonomousWriters")
        .controller("ReaderController", ReaderController);

    function ReaderController($rootScope, $routeParams, $location, UserService) {
        var vm = this;
        vm.logout = logout;

        vm.userId = $routeParams.uid;

        function init() {
            var promise = UserService.findUserById(vm.userId);
            promise.success(function (user) {
                vm.user = user;
            });

            promise.error(function (res, status) {
                vm.error = res;
            });
        }
        init();

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