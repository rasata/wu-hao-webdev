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
            var promise = UserService.findUserByCredentials(user.username, user.password);

            // execute when the server side actually returns the user object
            promise.success(function (user) {
                if (user) {
                    $location.url("/user/" + user._id);
                } else {
                    vm.error = "User not found";
                }
            });
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
            var promise = UserService.findUserByUsername(user.username);
            promise.success(function (retUser) {
                if (retUser) {
                    vm.error = "User already exist";
                } else {
                    // TODO: create user also returns a promise?
                    var createUserPromise = UserService.createUser(user);
                        createUserPromise.success(function () {
                            $location.url("/user/" + user._id);
                        });

                        createUserPromise.error(function (createUserRes, createUserStatus) {
                            vm.error = createUserRes;
                        });
                }
            });
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
            var promise = UserService.findUserById(vm.userId);
            promise.success(function (user) {
                vm.user = user;
            });
        }

        init();

        function updateUser(newUser) {
            var promise = UserService.updateUser(vm.userId, newUser);
            promise.success(function (user) {
                if (user == null) {
                    vm.error = "unable to update user.";
                } else {
                    vm.message = "user successfully updated.";
                }
            });
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