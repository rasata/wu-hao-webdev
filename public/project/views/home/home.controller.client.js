/**
 * Created by wuhao on 2017-03-24.
 */
(function () {
    angular
        .module("AutonomousWriters")
        .controller("HomeController", HomeController);

    function HomeController($rootScope, $location, UserService) {
        var vm = this;

        vm.logout = logout;
        vm.gotoProfile = gotoProfile;

        // event handlers
        function init() {

        }

        init();

        function logout() {
            var promise = UserService.logout($rootScope.currentUser);

            promise.success(function (response) {
                $rootScope.currentUser = null;
                $location.url("/home");
            });

            promise.error(function (res, status) {
                $rootScope.currentUser = null;
                $location.url("/home");
            });
        }

        function gotoProfile() {
            $location.url("#/user/"+$rootScope.currentUser._id);
        }
    }
});