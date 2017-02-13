/**
 * Created by wuhao on 2017-02-11.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);


    function LoginController($location, UserService) {
        var vm = this;

        // event handlers
        vm.login = login;

        function init() {
        }
        init();

        function login(user) {
            var user = UserService.findUserByCredentials(user.username, user.password);
            if(user) {
                $location.url("/user/"+user._id);
            } else {
                vm.error = "User not found";
            }
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;

        function init() {
        }
        init();
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams["uid"];

        var user = UserService.findUserById(vm.userId);
        vm.user = user;

        vm.update = function (newUser) {
            var user = UserService.updateUser(vm.userId, newUser);
            if(user == null) {
                vm.error = "unable to update user";
            } else {
                vm.message = "user successfully updated.";
            }
        }

        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }
        init();
    }

})();