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

        function init() {
            // event handlers
            vm.login = login;
        }
        init();

        function login(user) {
            var oldUser = UserService.findUserByCredentials(user.username, user.password);
            if(oldUser) {
                $location.url("/user/"+oldUser._id);
            } else {
                vm.error = "User not found";
            }
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;

        function init() {
            // event handlers
            vm.register = register;
        }
        init();

        function register(user) {
            var oldUser = UserService.findUserByUsername(user.username);
            if(oldUser) {
                vm.error = "User already exist";
            } else {
                UserService.createUser(user);
                $location.url("/user/"+user._id);
            }
        }
    }

    function ProfileController($routeParams, $location, UserService) {
        var vm = this;

        // /user/:uid
        vm.userId = $routeParams["uid"];

        vm.update = function (newUser) {
            var user = UserService.updateUser(vm.userId, newUser);
            if(user == null) {
                vm.error = "unable to update user.";
            } else {
                vm.message = "user successfully updated.";
            }
        }

        function init() {
            vm.user = UserService.findUserById(vm.userId);
            vm.delete = deleteUser;
        }
        init();

        function deleteUser() {
            var flag = UserService.deleteUser(vm.userId);

            if (flag) {
                console.log("User deleted");
                $location.url("/login");
            } else {
                vm.error = "unable to delete user.";
            }
        }
    }

})();