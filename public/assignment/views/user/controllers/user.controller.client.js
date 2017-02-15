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

        // event handlers
        vm.register = register;

        function init() {
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

        // Event handler
        vm.update = updateUser;
        vm.delete = deleteUser;

        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }
        init();

        function updateUser(newUser) {
            var user = UserService.updateUser(vm.userId, newUser);
            if(user == null) {
                vm.error = "unable to update user.";
            } else {
                vm.message = "user successfully updated.";
            }
        }

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